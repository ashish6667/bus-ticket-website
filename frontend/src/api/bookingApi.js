const API_URL = "http://localhost:5000/api";

//  get token
const getToken = () => localStorage.getItem("token");

/*
  GET booked seats for a bus (PUBLIC)
  Backend returns: { success: true, seats: [1,2,3] }
 */
export const getBookedSeats = async (busId) => {
  const res = await fetch(`${API_URL}/bookings/seats/${busId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch booked seats");
  }

  // ALWAYS return array
  return Array.isArray(data.seats) ? data.seats : [];
};

/*
  CREATE booking (PROTECTED - JWT)
  Backend returns: { success: true, booking: {...} }
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


 // GET logged-in user's bookings (PROTECTED - JWT)
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

  // ALWAYS return array
  return Array.isArray(data.bookings) ? data.bookings : [];
};

/*
  CANCEL booking (PROTECTED - JWT)
  Backend returns: { success: true, message: "Booking cancelled" }
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
