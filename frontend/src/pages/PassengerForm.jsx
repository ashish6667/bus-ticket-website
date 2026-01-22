import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const busId = state?.busId;

  // Use seats from state or fallback to localStorage
  const storedSeats = JSON.parse(localStorage.getItem(`selectedSeats_bus_${busId}`));
  const seats = state?.seats || storedSeats || [];

  // Safety check
  if (!busId || !user) {
    navigate("/");
    return null;
  }

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Enter valid name");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    // Save booking info temporarily for payment
    const bookingData = {
      busId,
      seats,
      passenger: {
        name,
        phone,
        email: user.email,
      },
      amount: seats.length * 50, // example: 50 INR per seat
    };

    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    // Redirect to Payment page
    navigate("/payment", { state: bookingData });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

      <p className="mb-2">
        <strong>Seats:</strong> {seats.join(", ")}
      </p>

      <input
        placeholder="Passenger Name"
        value={name}
        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z ]/g, ""))}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default PassengerForm;
