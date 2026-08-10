import jwt from 'jsonwebtoken'
import { env } from '@/config/env.js'
import { UserPayload } from '@/middlewares/auth.middleware.js';


export const genAccessToken = (user: UserPayload) => {
    return jwt.sign(
        user,
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.ACCESS_EXPIRY as any }
    );
}

export const genRefreshToken = (user: { id: number }) => {
    return jwt.sign(
        user,
        env.JWT_REFRESH_SECRET,
        { expiresIn: env.REFRESH_EXPIRY as any }
    );
}