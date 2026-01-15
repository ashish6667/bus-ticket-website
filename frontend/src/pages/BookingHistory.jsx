import { useEffect, useState } from "react";
import { buses } from "../data/buses";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    fetch(`http://localhost:5000/api/bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data.reverse() : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading bookings...
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No bookings found 🚍
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      <div className="space-y-4">
        {bookings.map((b) => {
          const bus = buses.find(
            (bus) => bus.id === Number(b.busId)
          );

          return (
            <div
              key={b._id}
              className="bg-white shadow rounded p-4 border-l-4 border-blue-600"
            >
              <p className="font-semibold">
                Route: {bus?.from || "Unknown"} →{" "}
                {bus?.to || "Unknown"}
              </p>

              <p>
                Passenger: {b.name} ({b.email})
              </p>

              <p>Phone: {b.phone || "N/A"}</p>

              <p className="font-bold text-green-600">
                Seat No: {b.seatNumber}
              </p>

              <p className="text-sm text-gray-500">
                Booked At: {new Date(b.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingHistory;
