import { useState, useEffect } from "react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(allBookings);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p><strong>Bus ID:</strong> {b.busId}</p>
              <p><strong>Passenger:</strong> {b.passenger.name} ({b.passenger.email})</p>
              <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
