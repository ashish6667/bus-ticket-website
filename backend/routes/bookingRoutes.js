import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookedSeats,
} from "../controllers/booking.ctrl.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:email", getUserBookings);
router.get("/seats/:busId", getBookedSeats);

export default router;
