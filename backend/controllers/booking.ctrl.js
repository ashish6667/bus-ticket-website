import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  try {
    const { busId, seatNumber, name, email, phone } = req.body;

    if (!busId || !seatNumber || !name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = await Booking.create({
      busId,
      seatNumber,
      name,
      email,
      phone,
    });

    res.status(201).json(booking);
  } catch (error) {
    // Duplicate seat error
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Seat already booked" });
    }

    res.status(500).json({ message: "Booking failed" });
  }
};

export const getUserBookings = async (req, res) => {
  const { email } = req.params;

  const bookings = await Booking.find({ email });
  res.status(200).json(bookings);
};

// 🔹 NEW: Get booked seats for a bus
export const getBookedSeats = async (req, res) => {
  const { busId } = req.params;

  const bookings = await Booking.find({ busId }).select("seatNumber -_id");

  res.status(200).json(bookings.map(b => b.seatNumber));
};
