import { catchAsync } from "@/utils/CatchAsync.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { Request, Response } from "express";
import * as eventService from "./events.service.js";


export const getEvents = catchAsync(async (req: Request, res: Response) => {
    const { search } = req.query;

    const events = await eventService.getEvents(search as string);

    res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
});

export const getEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);

    const event = await eventService.getEvent(eventId);

    res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
});

export const createEvent = catchAsync(async (req: Request, res: Response) => {

    const organiserId = Number(req.user?.id);

    const event = await eventService.createEvent(req.body, organiserId);

    res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
});

export const updateEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const organiserId = Number(req.user?.id);

    const event = await eventService.updateEvent(eventId, req.body, organiserId);

    res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
});

export const deleteEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const organiserId = Number(req.user?.id);

    const result = await eventService.deleteEvent(eventId, organiserId);

    res.status(200).json(new ApiResponse(200, null, result.message));
});

export const getMyEvents = catchAsync(async (req: Request, res: Response) => {

    const organiserId = Number(req.user?.id);

    const events = await eventService.getMyEvents(organiserId);

    res.status(200).json(new ApiResponse(200, events, "Your events fetched successfully"));
});

export const getEventAttendees = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const organiserId = Number(req.user?.id);

    const attendees = await eventService.getAttendees(eventId, organiserId);

    res.status(200).json(new ApiResponse(200, attendees, "Attendees fetched successfully"));
});

export const rsvpToEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const userId = Number(req.user?.id);

    const result = await eventService.rsvp(eventId, userId);

    res.status(200).json(new ApiResponse(200, result, "RSVPed successfully"));
});