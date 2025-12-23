import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createService,
  getNearbyServices,
  assignProvider,
  completeService
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createService);
router.get("/nearby", authMiddleware, getNearbyServices);
router.patch("/assign", authMiddleware, assignProvider);
router.patch("/complete", authMiddleware, completeService);


export default router;
