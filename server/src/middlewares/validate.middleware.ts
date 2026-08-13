import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);

      req.body = parsed;

      next();
    } catch (error: any) {
      
      const firstError = error.issues?.[0];
      return res.status(400).json({
        success: false,
        message: `${firstError?.path[0]} : ${firstError?.message}`  || "Validation failed",
      });
    }
  };