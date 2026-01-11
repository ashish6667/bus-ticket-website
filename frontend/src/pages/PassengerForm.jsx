import { useLocation, useNavigate } from "react-router-dom";
import { bookSeat } from "../utils/seatBooking";
import toast from "react-hot-toast";

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  const { busId, seats } = state;
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const confirmBooking = () => {
    seats.forEach(seat => {
      bookSeat(busId, seat, user.email);
    });

    toast.success("Booking successful");
    navigate("/my-bookings");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

      <p><strong>Seats:</strong> {seats.join(", ")}</p>

      <button
        onClick={confirmBooking}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Confirm
      </button>
    </div>
  );
};

export default PassengerForm;
