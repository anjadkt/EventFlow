import { Router } from "express";
import * as rsvpController from "./rsvp.controller.js"
import { authenticate } from "@/middlewares/auth.middleware.js";

const router = Router();

// RSVP to an event
// POST /api/rsvp/:eventId
// Private
router.post("/:eventId", authenticate, rsvpController.rsvpToEvent);

// get RSVP of a user on event
// POST /api/rsvp/:eventId
// Private
router.get("/:eventId", authenticate, rsvpController.getRsvpOfEvent);


export default router;