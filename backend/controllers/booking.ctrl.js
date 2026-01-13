import bookings from "../data/bookings.js";
import generateId from "../utils/generateId.js";

export const createBooking = (req, res) => {
  const { busId, seatNumber, name, email, phone } = req.body;

  if (!busId || !seatNumber || !name || !email) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Seat already booked check
  const seatTaken = bookings.find(
    b => b.busId === busId && b.seatNumber === seatNumber
  );

  if (seatTaken) {
    return res.status(409).json({ message: "Seat already booked" });
  }

  const newBooking = {
    id: generateId(),
    busId,
    seatNumber,
    name,
    email,
    phone: phone || "N/A",
    bookedAt: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

  bookings.push(newBooking);

  res.status(201).json(newBooking);
};

export const getUserBookings = (req, res) => {
  const { email } = req.params;

  const userBookings = bookings.filter(
    booking => booking.email === email
  );

  res.status(200).json(userBookings);
};
