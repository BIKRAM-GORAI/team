import express from "express";
import { placeBid, getBids } from "../controllers/bid.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, placeBid);
router.get("/:serviceId", authMiddleware, getBids);

export default router;
