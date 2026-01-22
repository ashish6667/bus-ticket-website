// Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

// get token
const getToken = () => localStorage.getItem("token");

/*
  GET booked seats for a bus (PUBLIC)
*/
export const getBookedSeats = async (busId) => {
  const res = await fetch(`${API_URL}/bookings/seats/${busId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch booked seats");
  }

  return Array.isArray(data.seats) ? data.seats : [];
};

/*
  CREATE booking (PROTECTED - JWT)
*/
export const createBooking = async (bookingData) => {
  const token = getToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data.booking;
};

/*
  GET logged-in user's bookings (PROTECTED - JWT)
*/
export const getMyBookings = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return Array.isArray(data.bookings) ? data.bookings : [];
};

/*
  CANCEL booking (PROTECTED - JWT)
*/
export const cancelBooking = async (bookingId) => {
  const token = getToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data;
};
