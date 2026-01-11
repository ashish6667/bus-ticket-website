import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY_HERE"); // Replace with your Stripe public key

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // ⚠ Frontend-only: simulate success
    toast.success(`Payment of ₹${amount} successful!`);
    navigate("/my-bookings"); // Redirect after payment
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Payment</h2>
      <p className="mb-4">Amount to pay: <strong>₹{amount}</strong></p>
      <div className="border p-2 rounded mb-4">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className={`w-full py-2 rounded ${stripe ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
      >
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  const { id } = useParams(); // bus id
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const buses = JSON.parse(localStorage.getItem("buses")) || [];
    const bus = buses.find((b) => b.id === parseInt(id));
    if (bus) setAmount(bus.price);
  }, [id]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Payment;
