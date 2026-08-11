import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError.js";

export const errorMiddleware = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    success: false,
    ok: false,
    message: err.message || "Something went wrong!",
  });
};