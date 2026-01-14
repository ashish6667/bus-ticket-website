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
      phone: phone || "N/A"
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Seat already booked" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
