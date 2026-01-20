import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookedSeats,
  cancelBooking,
} from "../controllers/booking.ctrl.js";

import protect from "../middlewares/auth.js";

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a booking (JWT protected)
 * @access  Private
 */
router.post("/", protect, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get logged-in user's bookings
 * @access  Private
 */
router.get("/", protect, getUserBookings);

/**
 * @route   GET /api/bookings/seats/:busId
 * @desc    Get booked seats for a bus
 * @access  Public
 */
router.get("/seats/:busId", getBookedSeats);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Cancel a booking (JWT protected)
 * @access  Private
 */
router.delete("/:id", protect, cancelBooking);

export default router;
