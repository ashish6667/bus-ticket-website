import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../api/bookingApi";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

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
    } catch (error) {
      alert(error.message || "Failed to cancel booking");
    } finally {
      setCancelLoading(null);
    }
  };

  if (loading) return <p>Loading bookings...</p>;
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
