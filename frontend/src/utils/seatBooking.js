import { getISTDateTime } from "./dateTime";

// Get booked seats for a bus
export const getBookedSeats = (busId) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  const busBookings = bookings[busId] || [];
  return busBookings.map(b => b.seatNumber);
};

// Get seats booked by a specific user
export const getUserSeats = (busId, userEmail) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  const busBookings = bookings[busId] || [];
  return busBookings
    .filter(b => b.userEmail === userEmail)
    .map(b => b.seatNumber);
};

// BOOK SEAT
export const bookSeat = (busId, seatNumber, user) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  const myBookings = JSON.parse(localStorage.getItem("myBookings")) || [];

  const busBookings = bookings[busId] || [];

  if (busBookings.some(b => b.seatNumber === seatNumber)) {
    return false;
  }

  busBookings.push({ seatNumber, userEmail: user.email });
  bookings[busId] = busBookings;
  localStorage.setItem("bookings", JSON.stringify(bookings));

  myBookings.push({
    busId,
    seatNumber,
    name: user.name,
    email: user.email,
    phone: user.phone,
    bookedAt: getISTDateTime(),
  });

  localStorage.setItem("myBookings", JSON.stringify(myBookings));
  return true;
};

// CANCEL SEAT
export const cancelSeat = (busId, seatNumber, userEmail) => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
  const myBookings = JSON.parse(localStorage.getItem("myBookings")) || [];

  bookings[busId] = (bookings[busId] || []).filter(
    b => b.seatNumber !== seatNumber
  );

  localStorage.setItem("bookings", JSON.stringify(bookings));

  const updatedMyBookings = myBookings.filter(
    b =>
      !(b.busId === busId && b.seatNumber === seatNumber && b.email === userEmail)
  );

  localStorage.setItem("myBookings", JSON.stringify(updatedMyBookings));
};
