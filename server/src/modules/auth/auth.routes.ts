import { Router } from "express";
import * as authController from "./auth.controller.js"
import { authenticate } from "@/middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validate } from "@/middlewares/validate.middleware.js";

const router = Router();

// Register a new user
// POST /api/auth/register
// Public
router.post("/register", validate(registerSchema), authController.register);

// Login a user
// POST /api/auth/login
// Public
router.post("/login", validate(loginSchema), authController.login);

// Get access token
// GET /api/auth/refresh
// Public
router.get("/refresh", authController.getToken);

// Get logged in user
// GET /api/auth/profile
// Private
router.get("/profile", authenticate, authController.getProfile)

// Logout a user
// POST /api/auth/logout
// Private
router.post("/logout", authenticate, authController.logout)

export default router;