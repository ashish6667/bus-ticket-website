// utils/seatBooking.js

/**
 * Get booked seats for a bus
 * @param {string|number} busId
 * @returns {Array<number>} - Array of booked seat numbers
 */
export const getBookedSeats = (busId) => {
  let allBookings = {};
  try {
    allBookings = JSON.parse(localStorage.getItem("bookings")) || {};
  } catch (e) {
    console.error("Invalid bookings data in localStorage", e);
    allBookings = {};
  }

  // Ensure it's an array
  let busBookings = allBookings[busId];
  if (!Array.isArray(busBookings)) busBookings = [];

  return busBookings.map((b) => b.seatNumber);
};

/**
 * Book a seat for a bus by a user
 * @param {string|number} busId
 * @param {number} seatNumber
 * @param {string} userEmail
 * @returns {boolean} - true if booked successfully, false if already booked
 */
export const bookSeat = (busId, seatNumber, userEmail) => {
  let allBookings = {};
  try {
    allBookings = JSON.parse(localStorage.getItem("bookings")) || {};
  } catch (e) {
    console.error("Invalid bookings data in localStorage", e);
    allBookings = {};
  }

  // Ensure busBookings is an array
  let busBookings = allBookings[busId];
  if (!Array.isArray(busBookings)) busBookings = [];

  // Check if seat is already booked
  if (busBookings.find((b) => b.seatNumber === seatNumber)) {
    return false;
  }

  // Add new booking
  busBookings.push({ seatNumber, userEmail });

  allBookings[busId] = busBookings;
  localStorage.setItem("bookings", JSON.stringify(allBookings));

  return true;
};
