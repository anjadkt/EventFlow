import { catchAsync } from "@/utils/CatchAsync.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { Request, Response } from "express";
import * as eventService from "./events.service.js";

// @desc   Get all events
// @route  GET /api/events
// @access Public
export const getEvents = catchAsync(async (req: Request, res: Response) => {
    const { search } = req.query;

    const events = await eventService.getEvents(search as string);

    res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
});


// @desc   Get a single event by ID
// @route  GET /api/events/:eventId
// @access Public
export const getEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);

    const event = await eventService.getEvent(eventId);

    res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
});


// @desc   Create a new event
// @route  POST /api/events
// @access Private
export const createEvent = catchAsync(async (req: Request, res: Response) => {

    const organiserId = Number(req.user?.id);

    const event = await eventService.createEvent(req.body, organiserId);

    res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
});


// @desc   Update an event
// @route  PUT /api/events/:eventId
// @access Private
export const updateEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const organiserId = Number(req.user?.id);

    const event = await eventService.updateEvent(eventId, req.body, organiserId);

    res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
});

// @desc   Delete an event
// @route  DELETE /api/events/:eventId
// @access Private
export const deleteEvent = catchAsync(async (req: Request, res: Response) => {

    const eventId = Number(req.params.eventId);
    const organiserId = Number(req.user?.id);

    const result = await eventService.deleteEvent(eventId, organiserId);

    res.status(200).json(new ApiResponse(200, null, result.message));
});

// @desc   Get events created by the logged-in user
// @route  GET /api/events/my-events
// @access Private
export const getMyEvents = catchAsync(async (req: Request, res: Response) => {

    const organiserId = Number(req.user?.id);

    const events = await eventService.getMyEvents(organiserId);

    res.status(200).json(new ApiResponse(200, events, "Your events fetched successfully"));
});