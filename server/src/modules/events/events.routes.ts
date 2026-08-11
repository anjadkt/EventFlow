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

// Get a single event by ID
// GET /api/events/:eventId
// Public
router.get("/:eventId", eventController.getEvent);

router.use(authenticate);

// Get events created by the logged-in user
// GET /api/events/my-events
// Private
router.get("/my-events", eventController.getMyEvents);

// Create a new event
// POST /api/events
// Private
router.post("/", validate(createEventSchema), eventController.createEvent);

// Update an event
// PUT /api/events/:eventId
// Private
router.put("/:eventId", validate(updateEventSchema), eventController.updateEvent);

// Delete an event
// DELETE /api/events/:eventId
// Private
router.delete("/:eventId", eventController.deleteEvent);

// Get attendees of an event
// GET /api/events/:eventId/attendees
// Private
router.get("/:eventId/attendees", eventController.getEventAttendees);

// RSVP to an event
// POST /api/events/:eventId/rsvp
// Private
router.post("/:eventId/rsvp", eventController.rsvpToEvent);


export default router;