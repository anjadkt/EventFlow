import { LoginPayload, RegisterPayload } from "./auth.types.js";
import { prisma } from "@/config/prisma.js";
import { env } from "@/config/env.js";
import { ApiError } from "@/utils/ApiError.js";
import { genAccessToken, genRefreshToken } from "@/utils/createToken.js";
import bcrypt from "bcrypt";
import { verifyToken } from "@/utils/verifyToken.js";

export const register = async (payload: RegisterPayload) => {

    const { name, email, password } = payload;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, Number(env.BCRYPT_SALT));

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            token: ""
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    const access_token = genAccessToken({ id: user.id, email: user.email });
    const refresh_token = genRefreshToken({ id: user.id });

    await prisma.user.update({
        where: { id: user.id },
        data: { token: refresh_token }
    });

    return {
        user,
        access_token,
        refresh_token
    };
}

export const login = async (payload: LoginPayload) => {

    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }

    const accessToken = genAccessToken({ id: user.id, email: user.email });
    const refreshToken = genRefreshToken({ id: user.id });

    await prisma.user.update({
        where: { id: user.id },
        data: { token: refreshToken }
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        access_token: accessToken,
        refresh_token: refreshToken,
    }
}

export const profile = async (userId: number) => {

    if (userId === undefined) throw new ApiError(401, "Unauthorized!");

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}

export const token = async (refreshToken: string) => {

    if (!refreshToken) {
        throw new ApiError(403, "Refrsh token required");
    }

    const decoded = verifyToken(refreshToken, env.JWT_REFRESH_SECRET) as { id: number };

    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
    });

    if (!user || user.token !== refreshToken) {
        throw new ApiError(403, "Invalid refresh token");
    }

    const accessToken = genAccessToken({ id: user.id, email: user.email });
    const newRefreshToken = genRefreshToken({ id: user.id });

    await prisma.user.update({
        where: { id: user.id },
        data: { token: newRefreshToken }
    });

    return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
    }
}

export const logout = async (userId: number) => {

    if (userId === undefined) throw new ApiError(401, "Unauthorized!");

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { token: "" }
    });

    return {
        message: "Logged out successfully",
    }
}

