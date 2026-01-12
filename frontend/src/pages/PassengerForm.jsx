import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  const { busId, seats } = state;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    if (!name || !phone) {
      alert("Please fill all passenger details");
      return;
    }

    navigate(`/payment/${busId}`, {
      state: {
        busId,
        seats,
        passenger: {
          name,
          phone,
        },
      },
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

      <p className="mb-2">
        <strong>Seats:</strong> {seats.join(", ")}
      </p>

      <input
        type="text"
        placeholder="Passenger Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default PassengerForm;
