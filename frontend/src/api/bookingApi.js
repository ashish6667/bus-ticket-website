const API_URL = "http://localhost:5000/api";

export const getBookedSeats = async (busId) => {
  const res = await fetch(`${API_URL}/bookings/seats/${busId}`);
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
