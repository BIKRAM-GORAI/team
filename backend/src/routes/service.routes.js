import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createService,
  getServices,
  assignProvider,
  completeService,
  getProviderActiveJob
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createService);

// 🔑 ONE unified GET route
router.get("/", authMiddleware, getServices);

router.patch("/assign", authMiddleware, assignProvider);
router.patch("/complete", authMiddleware, completeService);
router.get("/active", authMiddleware, getProviderActiveJob);

export default router;
