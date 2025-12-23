import express from "express";
import { sendMessage, getMessages } from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:serviceId", authMiddleware, getMessages);


export default router;
