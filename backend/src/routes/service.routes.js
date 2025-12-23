import express from "express";
import {
  createService,
  getNearbyServices,
  assignProvider,
  completeService
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", createService);
router.get("/nearby", getNearbyServices);
router.patch("/assign", assignProvider);
router.patch("/complete", completeService);

export default router;
