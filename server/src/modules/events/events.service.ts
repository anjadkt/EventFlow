import { prisma } from "@/config/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import { CreateEventPayload, UpdateEventPayload, EventStatus } from "./events.types.js";
import { generateSlug } from "@/utils/genSlug.js";

// Create a new event
export const createEvent = async (payload: CreateEventPayload, organiserId: number) => {

    const { socialLinks, ...eventData } = payload;

    let slug = generateSlug(eventData.title);
    const existingSlug = await prisma.event.findUnique({ where: { slug } });
    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    if (["CANCELLED", "COMPLETED"].includes(eventData.status)) throw new ApiError(400, "Invalid status");

    const event = await prisma.event.create({
        data: {
            ...eventData,
            slug,
            bannerImage: eventData.bannerImage || "",
            logoImage: eventData.logoImage || "",
            organiserId,
            socialLinks: socialLinks ? {
                create: socialLinks.map(link => ({
                    platform: link.platform,
                    url: link.url
                }))
            } : undefined
        },
        include: {
            socialLinks: true,
            organiser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    return event;
};

// Get list of events with search
export const getEvents = async (search?: string) => {

    const where: any = {};

    if (search) {
        where.OR = [
            { title: { contains: search } },
            { description: { contains: search } }
        ];
    }

    const events = await prisma.event.findMany({
        where,
        include: {
            socialLinks: true,
            organiser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            startDate: "asc"
        }
    });

    return events;
};

// Get events created by a specific organiser
export const getMyEvents = async (organiserId: number) => {

    const events = await prisma.event.findMany({
        where: { organiserId },
        include: {
            socialLinks: true,
            organiser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            startDate: "asc"
        }
    });

    return events;
};


// Get a single event by ID
export const getEvent = async (eventId: number) => {
    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
            socialLinks: true,
            organiser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return event;
};

// Update an event
export const updateEvent = async (eventId: number, payload: UpdateEventPayload, organiserId: number) => {

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.organiserId !== organiserId) {
        throw new ApiError(403, "You are not authorized to update this event");
    }

    const { socialLinks, ...eventData } = payload;

    const updatedEvent = await prisma.$transaction(async (tx) => {

        if (socialLinks) {

            await tx.socialLink.deleteMany({
                where: { eventId }
            });

            await tx.socialLink.createMany({
                data: socialLinks.map(link => ({
                    eventId,
                    platform: link.platform,
                    url: link.url
                }))
            });
        }

        return await tx.event.update({
            where: { id: eventId },
            data: eventData,
            include: {
                socialLinks: true,
                organiser: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    });

    return updatedEvent;
};

// Delete an event
export const deleteEvent = async (eventId: number, organiserId: number) => {

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.organiserId !== organiserId) {
        throw new ApiError(403, "You are not authorized to delete this event");
    }

    await prisma.$transaction(async (tx) => {
        await tx.socialLink.deleteMany({
            where: { eventId }
        });

        await tx.rsvp.deleteMany({
            where: { eventId }
        });

        await tx.event.delete({
            where: { id: eventId }
        });
    });

    return {
        message: "Event deleted successfully"
    };
};
