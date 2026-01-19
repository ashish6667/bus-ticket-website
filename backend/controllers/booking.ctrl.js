import Booking from "../models/booking.model.js";

/**
 * @desc    Create booking (JWT protected)
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = async (req, res) => {
  try {
    const { busId, seatNumber, name, phone } = req.body;

    // user info from JWT
    const { email, id: userId } = req.user;

    /* ================= Validation ================= */
    if (!busId || seatNumber === undefined || !name) {
      return res.status(400).json({
        success: false,
        message: "Bus, seat number and name are required",
      });
    }

    if (isNaN(seatNumber) || seatNumber < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat number",
      });
    }

    /* ================= Prevent duplicate booking ================= */
    const existingBooking = await Booking.findOne({
      busId,
      seatNumber,
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Seat already booked",
      });
    }

    /* ================= Create booking ================= */
    const booking = await Booking.create({
      busId,
      seatNumber,
      name,
      email,
      phone,
      userId, //  useful for future relations
    });

    res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};

/**
 * @desc    Get logged-in user's bookings
 * @route   GET /api/bookings
 * @access  Private
 */
export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.user;

    const bookings = await Booking.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/**
 * @desc    Get booked seats for a bus
 * @route   GET /api/bookings/seats/:busId
 * @access  Public
 */
export const getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    if (!busId) {
      return res.status(400).json({
        success: false,
        message: "Bus ID required",
      });
    }

    const bookings = await Booking.find({ busId })
      .select("seatNumber -_id")
      .lean();

    res.status(200).json({
      success: true,
      seats: bookings.map(b => b.seatNumber),
    });

  } catch (error) {
    console.error("Fetch seats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booked seats",
    });
  }
};
