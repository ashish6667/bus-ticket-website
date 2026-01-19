import { useEffect, useState } from "react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Bookings API response:", data);

        // ✅ FIX HERE
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to load bookings", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking._id} className="border p-3 mb-3 rounded">
          <p><b>Name:</b> {booking.name}</p>
          <p><b>Bus ID:</b> {booking.busId}</p>
          <p><b>Seat:</b> {booking.seatNumber}</p>
          <p><b>Email:</b> {booking.email}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
