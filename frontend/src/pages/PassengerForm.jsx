import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PassengerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bus, selectedSeats } = location.state || {};

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
  });

  if (!bus || !selectedSeats) {
    return <p className="p-6 text-red-600">No bus or seats selected!</p>;
  }

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    const bookingData = {
      busId: bus.id,
      passenger: {
        name: passenger.name,
        email: passenger.email,
        phone: passenger.phone,
      },
      seats: selectedSeats,
    };

    // Save booking history in localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, bookingData])
    );

    toast.success("Booking successful!");
    console.log("Booking Data:", bookingData);

    navigate("/"); // redirect after booking
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Passenger Details</h1>

        <p className="mb-2">
          <strong>Bus:</strong> {bus.name} ({bus.from} → {bus.to})
        </p>
        <p className="mb-4">
          <strong>Seats:</strong> {selectedSeats.join(", ")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={passenger.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={passenger.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={passenger.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
          >
            Proceed to Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default PassengerForm;
