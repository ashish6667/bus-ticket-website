import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookedSeats,
} from "../controllers/booking.ctrl.js";

import protect from "../middlewares/auth.js"; //  correct path

const router = express.Router();

//  PROTECTED ROUTES
router.post("/", protect, createBooking);
router.get("/", protect, getUserBookings);

//  PUBLIC ROUTE
router.get("/seats/:busId", getBookedSeats);

export default router;
