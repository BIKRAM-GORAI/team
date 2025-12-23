import express from "express";
import { placeBid, getBids } from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/", placeBid);
router.get("/:serviceId", getBids);

export default router;
