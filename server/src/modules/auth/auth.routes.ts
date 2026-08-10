import { Router } from "express";
import * as authController from "./auth.controller.js"
import { authenticate } from "@/middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validate } from "@/middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register)
router.post("/login", validate(loginSchema), authController.login)
router.get("/token", authController.getToken)
router.get("/me", authenticate, authController.getMe)
router.post("/logout", authenticate, authController.logout)

export default router;