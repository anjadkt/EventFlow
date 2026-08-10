import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError.js";
import { env } from "@/config/env.js";
import { verifyToken } from "@/utils/verifyToken.js";


export type UserPayload = {
  id: number,
  email: string
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.access_token;

  if (!token) throw new ApiError(401, "Unauthorized");

  const decoded = verifyToken(token, env.JWT_ACCESS_SECRET) as UserPayload

  req.user = decoded;
  next();

};