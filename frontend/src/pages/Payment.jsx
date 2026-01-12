import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getISTDateTime } from "../utils/dateTime";

const Payment = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  const { seats, passenger } = state;
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handlePayment = () => {
    const myBookings =
      JSON.parse(localStorage.getItem("myBookings")) || [];

    seats.forEach((seatNumber) => {
      myBookings.push({
        busId: id,
        seatNumber,
        name: passenger.name,
        phone: passenger.phone,
        email: user.email,
        bookedAt: getISTDateTime(),
      });
    });

    localStorage.setItem("myBookings", JSON.stringify(myBookings));

    toast.success("Payment successful 🎉");
    navigate("/my-bookings");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>

      <p>
        <strong>Passenger:</strong> {passenger.name}
      </p>
      <p>
        <strong>Phone:</strong> {passenger.phone}
      </p>
      <p>
        <strong>Seats:</strong> {seats.join(", ")}
      </p>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
