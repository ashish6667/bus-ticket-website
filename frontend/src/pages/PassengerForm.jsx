import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  const { busId, seats } = state;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔒 VALIDATION ON SUBMIT
  const validate = () => {
    if (!name.trim()) {
      toast.error("Passenger name is required");
      return false;
    }

    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!phone) {
      toast.error("Phone number is required");
      return false;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validate()) return;

    navigate(`/payment/${busId}`, {
      state: {
        busId,
        seats,
        passenger: {
          name: name.trim(),
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

      {/* ✅ NAME — LETTERS ONLY */}
      <input
        type="text"
        placeholder="Passenger Name"
        value={name}
        onChange={(e) => {
          // Allow only letters and spaces
          const value = e.target.value.replace(/[^A-Za-z ]/g, "");
          setName(value);
        }}
        className="w-full border p-2 rounded mb-3"
      />

      {/* ✅ PHONE — NUMBERS ONLY */}
      <input
        type="text"
        placeholder="10-digit Mobile Number"
        value={phone}
        onChange={(e) => {
          // Allow only digits and limit to 10
          const value = e.target.value.replace(/\D/g, "");
          if (value.length <= 10) {
            setPhone(value);
          }
        }}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default PassengerForm;
