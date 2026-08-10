import { Router } from "express";
import { authenticate } from "@/middlewares/auth.middleware.js";
import * as eventController from "./events.controller.js"
import { validate } from "@/middlewares/validate.middleware.js";
import { createEventSchema, updateEventSchema } from "./events.validate.js";

const router = Router();

router.get("/", eventController.getEvents);
router.get("/:eventId", eventController.getEvent);

router.use(authenticate);

router.get("/me", eventController.getMyEvents);
router.post("/", validate(createEventSchema), eventController.createEvent);
router.put("/:eventId", validate(updateEventSchema), eventController.updateEvent);
router.delete("/:eventId", eventController.deleteEvent);

export default router;