const API_URL = "http://localhost:5000/api";

//  helper: get token
const getToken = () => localStorage.getItem("token");

/**
 * GET booked seats for a bus (PUBLIC)
 */
export const getBookedSeats = async (busId) => {
  const res = await fetch(`${API_URL}/bookings/seats/${busId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch booked seats");
  }

  return res.json();
};

/**
 * CREATE booking (PROTECTED - JWT)
 */
export const createBooking = async (data) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //  JWT
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Booking failed");
  }

  return result;
};

/**
 * GET logged-in user's bookings (PROTECTED - JWT)
 */
export const getMyBookings = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`, //  JWT
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
