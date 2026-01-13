import express from "express";
import { createBooking, getUserBookings } from "../controllers/booking.ctrl.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:email", getUserBookings);

export default router;
