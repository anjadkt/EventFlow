import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.body) as any;

                req.body = parsed;

                next();
            } catch (error: any) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.errors,
                });
            }
        };