import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createCheckoutSession } from "../api/paymentApi";
import toast from "react-hot-toast";

const Payment = () => {
  const { state } = useLocation();
  if (!state) return null;

  const { busId, seats, amount } = state; // amount in INR

  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  // State for passenger info
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!name.trim()) {
      toast.error("Enter passenger name");
      return;
    }
    if (!phone || phone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      await createCheckoutSession({
        amount,
        busId,
        seats,
        passenger: { name, phone, email },
      });
      // Stripe will redirect automatically
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Passenger Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className="w-full border p-2 rounded"
          placeholder="10-digit phone number"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <p className="mb-2">
        <strong>Seats:</strong> {seats.join(", ")}
      </p>
      <p className="mb-4">
        <strong>Amount:</strong> ₹{amount}
      </p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-green-600"
        }`}
      >
        {loading ? "Processing Payment..." : "Pay & Book"}
      </button>
    </div>
  );
};

export default Payment;
