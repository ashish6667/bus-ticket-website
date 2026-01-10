import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    //  Load only this user's bookings
    const userBookingKey = `bookings_${loggedInUser.email}`;
    const userBookings = JSON.parse(localStorage.getItem(userBookingKey)) || [];

    setBookings(userBookings);
  }, []);

  if (bookings.length === 0) {
    return <p className="p-6 text-red-600">No bookings found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((b, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <p><strong>Bus ID:</strong> {b.busId}</p>
            <p><strong>Route:</strong> {b.busRoute}</p>
            <p>
              <strong>Passenger:</strong> {b.passenger.name} ({b.passenger.email})
            </p>
            <p><strong>Phone:</strong> {b.passenger.phone}</p>
            <p><strong>Seats:</strong> {b.seats.join(", ")}</p>
            <p><strong>Booked At:</strong> {b.bookedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
