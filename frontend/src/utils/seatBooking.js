// Get all bookings safely
const getAllBookings = () => {
  const data = JSON.parse(localStorage.getItem("bookings"));
  return typeof data === "object" && data !== null ? data : {};
};

// Get booked seat numbers for a bus
export const getBookedSeats = (busId) => {
  const bookings = getAllBookings();
  const busBookings = Array.isArray(bookings[busId]) ? bookings[busId] : [];
  return busBookings.map(b => b.seatNumber);
};

// Get seats booked by a specific user
export const getUserSeats = (busId, userEmail) => {
  const bookings = getAllBookings();
  const busBookings = Array.isArray(bookings[busId]) ? bookings[busId] : [];
  return busBookings
    .filter(b => b.userEmail === userEmail)
    .map(b => b.seatNumber);
};

// Book seat
export const bookSeat = (busId, seatNumber, userEmail) => {
  const bookings = getAllBookings();
  const busBookings = Array.isArray(bookings[busId]) ? bookings[busId] : [];

  if (busBookings.some(b => b.seatNumber === seatNumber)) {
    return false;
  }

  busBookings.push({ seatNumber, userEmail });
  bookings[busId] = busBookings;
  localStorage.setItem("bookings", JSON.stringify(bookings));

  return true;
};

// Cancel seat
export const cancelSeat = (busId, seatNumber, userEmail) => {
  const bookings = getAllBookings();
  const busBookings = Array.isArray(bookings[busId]) ? bookings[busId] : [];

  bookings[busId] = busBookings.filter(
    b => !(b.seatNumber === seatNumber && b.userEmail === userEmail)
  );

  localStorage.setItem("bookings", JSON.stringify(bookings));
};
