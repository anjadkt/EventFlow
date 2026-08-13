import { z } from "zod";

export const createEventSchema = z.object({

    title: z
        .string()
        .trim()
        .min(5, "Event name must be at least 5 characters long")
        .max(100, "Event name mustn't exceed 100 characters"),
    description: z
        .string()
        .trim()
        .min(50, "Event description must be at least 50 characters long")
        .max(2000, "Event description mustn't exceed 2000 characters"),

    startDate: z
        .coerce
        .date("Event starting date required")
        .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" })
        .refine((date) => date.getTime() > Date.now(), "Start date must be in the future")
        .refine((date) => date.getTime() < Date.now() + 60 * 24 * 60 * 60 * 1000, "Start date must be within two months"),

    endDate: z
        .coerce
        .date("Event ending date required")
        .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" })
        .refine((date) => date.getTime() > Date.now(), "End date must be in the future"),

    deadline: z
        .coerce
        .date("Event registration deadline required")
        .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" })
        .refine((date) => date.getTime() > Date.now(), "deadline must be in the future"),

    isFree: z.boolean().default(true),

    price: z
        .coerce
        .number("need a valid price")
        .positive("Price must be positive")
        .min(10, "Minimum price must be at least 10")
        .max(1000000, "Maximum price must be at most 1000000")
        .optional(),

    maxTickets: z
        .coerce
        .number("Need a valid number")
        .int("Max tickets must be an integer")
        .positive("Max tickets must be positive")
        .min(10, "Minimum tickets must be at least 10")
        .max(10000, "Maximum tickets must be at most 10000")
        .optional(),

    socialLinks: z
        .array(
            z.object({
                platform: z.enum(["INSTAGRAM", "TWITTER", "LINKEDIN", "FACEBOOK", "YOUTUBE", "TIKTOK"]),
                url: z.url("Please provide a valid URL"),
            })
        )
        .max(5, "Maximum 5 social links allowed")
        .optional(),

    media: z
        .array(
            z.object({
                name: z.enum(["BANNER", "THUMBNAIL", "LOGO", "IMAGE"]),
                url: z.url("Please provide a valid URL"),
            })
        )
        .max(6, "Maximum 6 social links allowed")
        .min(1, "minimum logo required!"),

    location: z
        .string()
        .min(10, "Location must be at least 10 characters long")
        .max(1000, "Location must not exceed 1000 characters")
        .trim(),

    locationLink: z
        .url("Please provide a valid URL"),

    venueName: z
        .string()
        .min(3, "Venue name must be at least 3 characters long")
        .max(100, "Venue name must not exceed 100 characters")
        .trim(),

    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]).default("DRAFT")
})
    .refine((data) => data.isFree ? !data.price : true, {
        message: "Free event must not have price",
        path: ["price"],
    })

    .refine((data) => !data.isFree ? !!data.price : true, {
        message: "Paid event must have price",
        path: ["price"],
    })

    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    })

    .refine((data) => data.deadline < data.startDate, {
        message: "deadline must be before start date",
        path: ["deadline"],
    })

export const updateEventSchema = createEventSchema;