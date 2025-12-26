import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addReview,
  getReviewsByUser
} from "../controllers/review.controller.js";

const router = express.Router();

// submit review
router.post("/", authMiddleware, addReview);

// view reviews of a user
router.get("/:userId", authMiddleware, getReviewsByUser);

export default router;
