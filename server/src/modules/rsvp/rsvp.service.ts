import { prisma } from "@/config/prisma.js";
import { RSVPStatus } from "../events/events.types.js";
import { ApiError } from "@/utils/ApiError.js";


// create or update rsvps for a event
export const rsvp = async (eventId: number, userId: number) => {

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (userId === event?.organiserId) {
        throw new ApiError(400, "You cannot RSVP to your own event");
    }

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (["CANCELLED", "COMPLETED"].includes(event.status)) {
        throw new ApiError(400, "Cannot RSVP to a cancelled or completed event");
    }

    const now = new Date();

    if (now >= event.deadline) {
        throw new ApiError(
            400,
            "RSVP deadline has passed"
        );
    }

    if (now >= event.startDate) {
        throw new ApiError(
            400,
            "Cannot RSVP after the event has started"
        );
    }

    if (now >= event.endDate) {
        throw new ApiError(
            400,
            "Cannot RSVP after the event has ended"
        );
    }

    const existingRsvp = await prisma.rsvp.findUnique({
        where: {
            eventId_userId: {
                eventId,
                userId
            }
        }
    });

    let rsvpStatus: RSVPStatus = "GOING";

    if (existingRsvp) {

        if (existingRsvp.status === "GOING") {
            rsvpStatus = "NOT_GOING";
        } else if (existingRsvp.status === "NOT_GOING") {
            rsvpStatus = "GOING";
        } else if (existingRsvp.status === "MAYBE_GOING") {
            rsvpStatus = "GOING";
        }

        const updatedRsvp = await prisma.rsvp.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId
                }
            },
            data: {
                status: rsvpStatus
            },
            select: {
                id : true,
                status: true,
                createdAt: true
            }
        });

        return updatedRsvp;
    }

    const rsvp = await prisma.rsvp.create({
        data: {
            eventId,
            userId,
            status: "GOING"
        },
        select: {
            id : true,
            status: true,
            createdAt: true
        }
    });

    return rsvp;
}

// get rsvp of user from an event
export const getRsvp = async (eventId: number, userId: number) => {

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const rsvp = await prisma.rsvp.findUnique({
        where: {
            eventId_userId: {
                eventId,
                userId
            }
        },
        select: {
            id: true,
            status: true,
            createdAt : true
        }
    })

    return rsvp;
}