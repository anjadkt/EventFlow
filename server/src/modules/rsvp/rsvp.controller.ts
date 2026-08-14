import { ApiResponse } from "@/utils/ApiResponse.js";
import { catchAsync } from "@/utils/CatchAsync.js";
import * as rsvpService from "./rsvp.service.js";
import { Request, Response } from "express";

export const rsvpToEvent = catchAsync(async (req: Request, res: Response) => {

  const eventId = Number(req.params.eventId);
  const userId = Number(req.user?.id);

  const result = await rsvpService.rsvp(eventId, userId);

  res.status(200).json(new ApiResponse(200, result, "RSVPed successfully"));
});


export const getRsvpOfEvent = catchAsync(async (req: Request, res: Response) => {

  const eventId = Number(req.params.eventId);
  const userId = Number(req.user?.id);

  const result = await rsvpService.getRsvp(eventId, userId);

  res.status(200).json(new ApiResponse(200, result, "rsvp fetched successfully"));
})