import express from "express";
import { updateLocation } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Update user location
router.put("/location", authMiddleware, updateLocation);

export default router;
