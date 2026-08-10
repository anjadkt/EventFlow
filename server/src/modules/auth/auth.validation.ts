import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(50, "Name mustn't exceed 50 characters")
        .trim(),
    email: z
        .email("Invalid email address")
        .max(50, "Email mustn't exceed 50 characters")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(12, "Password mustn't exceed 12 characters"),
});

export const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .max(50, "Email mustn't exceed 50 characters")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(12, "Password mustn't exceed 12 characters"),
});