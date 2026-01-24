import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../api/bookingApi";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to load bookings", err);
      setError(err.message || "Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      setCancelLoading(bookingId);
      await cancelBooking(bookingId);

      // Remove cancelled booking from UI
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      alert(err.message || "Failed to cancel booking");
    } finally {
      setCancelLoading(null);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bookings.length) return <p>No bookings found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border p-4 mb-4 rounded shadow-sm"
        >
          <p><b>Name:</b> {booking.name}</p>
          <p><b>Bus ID:</b> {booking.busId}</p>
          <p><b>Seat:</b> {booking.seatNumber}</p>
          <p><b>Email:</b> {booking.email}</p>

          <button
            onClick={() => handleCancel(booking._id)}
            disabled={cancelLoading === booking._id}
            className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {cancelLoading === booking._id ? "Cancelling..." : "Cancel Ticket"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
