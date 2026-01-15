import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  try {
    const { busId, seatNumber, name, phone } = req.body;
    const email = req.user.email; //  FROM JWT

    if (!busId || !seatNumber || !name) {
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
    if (error.code === 11000) {
      return res.status(409).json({ message: "Seat already booked" });
    }
    res.status(500).json({ message: "Booking failed" });
  }
};

export const getUserBookings = async (req, res) => {
  const email = req.user.email; //  FROM JWT

  const bookings = await Booking.find({ email });
  res.status(200).json(bookings);
};

export const getBookedSeats = async (req, res) => {
  const { busId } = req.params;

  const bookings = await Booking.find({ busId }).select("seatNumber -_id");
  res.status(200).json(bookings.map(b => b.seatNumber));
};
