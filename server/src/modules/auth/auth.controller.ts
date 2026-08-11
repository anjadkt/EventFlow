import { catchAsync } from "@/utils/CatchAsync.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import type { Request, Response } from "express";
import * as authService from "./auth.service.js"
import { accessOptions, refreshOptions } from "@/utils/cookieOptions.js";

export const register = catchAsync(async (req: Request, res: Response) => {

    const { user, access_token, refresh_token } = await authService.register(req.body);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(201).json(new ApiResponse(201, user, "User registered successfully"));

});

export const login = catchAsync(async (req: Request, res: Response) => {

    const { user, access_token, refresh_token } = await authService.login(req.body);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(200).json(new ApiResponse(200, user, "Logged in successfully"));

});

export const getProfile = catchAsync(async (req: Request, res: Response) => {

    const user = await authService.profile(Number(req.user?.id));

    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const getToken = catchAsync(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refresh_token;

    const { access_token, refresh_token } = await authService.token(refreshToken);

    res.cookie("access_token", access_token, accessOptions);

    res.cookie("refresh_token", refresh_token, refreshOptions);

    res.status(200).json(new ApiResponse(200, null, "Token refreshed successfully"));

});

export const logout = catchAsync(async (req: Request, res: Response) => {

    await authService.logout(Number(req.user?.id));

    res.clearCookie("access_token", accessOptions);
    res.clearCookie("refresh_token", refreshOptions);

    res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));

});