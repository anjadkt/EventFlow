import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes.js"
import eventRoutes from "@/modules/events/events.routes.js"

const router = Router();

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)

export default router;