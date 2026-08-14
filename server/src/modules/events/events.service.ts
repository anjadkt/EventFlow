import { prisma } from "@/config/prisma.js";
import { ApiError } from "@/utils/ApiError.js";
import { CreateEventPayload, UpdateEventPayload } from "./events.types.js";
import { generateSlug } from "@/utils/genSlug.js";

// Create a new event
export const createEvent = async (payload: CreateEventPayload, organiserId: number) => {

    const { media, socialLinks, ...eventData } = payload;

    let slug = generateSlug(eventData.title);
    const existingSlug = await prisma.event.findUnique({ where: { slug } });
    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    if (!["DRAFT", "PUBLISHED"].includes(eventData.status)) throw new ApiError(400, "Invalid status");

    const event = await prisma.event.create({
        data: {
            ...eventData,
            slug,
            organiserId,
            media: {
                create: media.map(link => ({
                    name: link.name,
                    url : link.url
                }))
            },
            socialLinks: socialLinks ? {
                create: socialLinks.map(link => ({
                    platform: link.platform,
                    url: link.url
                }))
            } : undefined
        },
        include: {
            socialLinks: true,
            media: true,
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

    const where: any = {
        status : "PUBLISHED"
    };

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
            media : true,
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
            media : true,
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
export const getEvent = async (slug: string) => {
    const event = await prisma.event.findUnique({
        where: { slug },
        include: {
            socialLinks: true,
            media : true,
            organiser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            rsvps: {
                select: {
                    status: true,
                    createdAt: true
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

    const { media, socialLinks, ...eventData } = payload;

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

        if (media) {

            await tx.media.deleteMany({
                where: { eventId }
            });

            await tx.media.createMany({
                data: media.map(link => ({
                    eventId,
                    name : link.name,
                    url: link.url
                }))
            });
        }

        return await tx.event.update({
            where: { id: eventId },
            data: eventData,
            include: {
                socialLinks: true,
                media : true,
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

        await tx.media.deleteMany({
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

// get users attending the event
export const getAttendees = async (eventId: number, organiserId: number) => {

    const event = await prisma.event.findUnique({
        where: {
            id: eventId,
            organiserId
        }
    });

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.organiserId !== organiserId) {
        throw new ApiError(403, "You are not authorized to get attendees of this event");
    }

    const attendees = await prisma.rsvp.findMany({
        where: {
            eventId,
            status: "GOING"
        },
        select: {
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return attendees;
};
