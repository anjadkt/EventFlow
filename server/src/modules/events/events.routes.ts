import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import * as eventController from "./events.controller.js"
import { validate } from "@/middlewares/validate.middleware.js";
import { createEventSchema, updateEventSchema } from "./events.validate.js";

const router = Router();

// Get all events
// GET /api/events
// Public
router.get("/", eventController.getEvents);

// Get events created by the logged-in user
// GET /api/events/my-events
// Private
router.get("/my-events",authenticate, eventController.getMyEvents);

// Get a single event by ID
// GET /api/events/:eventId
// Public
router.get("/:slug", eventController.getEvent);


// Create a new event
// POST /api/events
// Private
router.post("/",authenticate, validate(createEventSchema), eventController.createEvent);

// Update an event
// PUT /api/events/:eventId
// Private
router.put("/:eventId",authenticate, validate(updateEventSchema), eventController.updateEvent);

// Get attendees of an event
// GET /api/events/:eventId/attendees
// Private
router.get("/:eventId/attendees",authenticate, eventController.getEventAttendees);


export default router;