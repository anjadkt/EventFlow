import jwt from 'jsonwebtoken'
import { ApiError } from './ApiError.js';

export const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new ApiError(401, "Invalid token");
    }
}