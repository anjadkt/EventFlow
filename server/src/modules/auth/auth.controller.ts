import { catchAsync } from "@/utils/CatchAsync.js";
import { env } from "@/config/env.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import type { CookieOptions, Request, Response } from "express";
import * as authService from "./auth.service.js"

const isProduction = env.NODE_ENV === "production"

const accessOptions: CookieOptions = isProduction ? {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
} : {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
    partitioned: true
}

const refreshOptions: CookieOptions = isProduction ? {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
} : {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    partitioned: true
}


// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
export const register = catchAsync(async (req: Request, res: Response) => {

    const { user, access_token, refresh_token } = await authService.register(req.body);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(201).json(new ApiResponse(201, user, "User registered successfully"));

});


// @desc   Login a user
// @route  POST /api/auth/login
// @access Public
export const login = catchAsync(async (req: Request, res: Response) => {

    const { user, access_token, refresh_token } = await authService.login(req.body);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(200).json(new ApiResponse(200, user, "Logged in successfully"));

});


// @desc   Get current user
// @route  GET /api/auth/me
// @access Private
export const getMe = catchAsync(async (req: Request, res: Response) => {

    const user = await authService.me(Number(req.user?.id));

    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});


// @desc   Refresh access token
// @route  POST /api/auth/refresh
// @access Private
export const getToken = catchAsync(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refresh_token;

    const { access_token, refresh_token } = await authService.token(refreshToken);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(200).json(new ApiResponse(200, null, "Token refreshed successfully"));

});


// @desc   Logout user
// @route  POST /api/auth/logout
// @access Private
export const logout = catchAsync(async (req: Request, res: Response) => {

    await authService.logout(Number(req.user?.id));

    res.clearCookie("access_token", accessOptions);
    res.clearCookie("refresh_token", refreshOptions);

    res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));

});