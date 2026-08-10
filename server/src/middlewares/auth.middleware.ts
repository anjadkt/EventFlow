import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError.js";
import jwt from "jsonwebtoken";
import { env } from "@/config/env.js";


export type UserPayload = {
  id: string,
  email : string
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.access_token;

  if (!token) throw new ApiError(401, "Unauthorized");

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as UserPayload

    req.user = decoded;
    next();

  } catch {
    throw new ApiError(401, "Invalid token");
  }
};