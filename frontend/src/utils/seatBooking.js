import { getISTDateTime } from "./dateTime";

// Get all bookings safely
const getAllBookings = () => {
  const data = JSON.parse(localStorage.getItem("myBookings"));
  return Array.isArray(data) ? data : [];
};

// Get booked seat numbers for a bus
export const getBookedSeats = (busId) => {
  const bookings = getAllBookings();
  const busBookings = bookings.filter(b => b.busId === busId);
  return busBookings.map(b => b.seatNumber);
};

// Get seats booked by a specific user
export const getUserSeats = (busId, userEmail) => {
  const bookings = getAllBookings();
  const busBookings = bookings.filter(b => b.busId === busId && b.email === userEmail);
  return busBookings.map(b => b.seatNumber);
};

// Book seat
export const bookSeat = (busId, seatNumber, user) => {
  const bookings = getAllBookings();

  // Check if seat is already booked by anyone
  const seatTaken = bookings.some(b => b.busId === busId && b.seatNumber === seatNumber);
  if (seatTaken) return false;

  const myBooking = {
    busId,
    seatNumber,
    name: user.name,
    email: user.email,
    phone: user.phone || "N/A",
    bookedAt: getISTDateTime(),
  };

  bookings.push(myBooking);
  localStorage.setItem("myBookings", JSON.stringify(bookings));
  return true;
};

// Cancel seat
export const cancelSeat = (busId, seatNumber, userEmail) => {
  const bookings = getAllBookings();
  const updated = bookings.filter(b => !(b.busId === busId && b.seatNumber === seatNumber && b.email === userEmail));
  localStorage.setItem("myBookings", JSON.stringify(updated));
};
