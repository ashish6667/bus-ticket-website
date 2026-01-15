import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getBookedSeats } from "../api/bookingApi";

const SeatSelection = () => {
  const { id } = useParams();          // busId from URL
  const navigate = useNavigate();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const TOTAL_SEATS = 40; // temporary (later from backend)

  useEffect(() => {
    getBookedSeats(id)
      .then(setBookedSeats)
      .catch(() => toast.error("Failed to load seats"));
  }, [id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error("Seat already booked");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const continueBooking = () => {
    if (!selectedSeats.length) {
      toast.error("Select at least one seat");
      return;
    }

    navigate("/passenger", {
      state: {
        busId: id,
        seats: selectedSeats,
      },
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Seats</h2>

      <div className="grid grid-cols-8 gap-2 mb-4">
        {Array.from({ length: TOTAL_SEATS }, (_, i) => {
          const seat = i + 1;
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          return (
            <button
              key={seat}
              disabled={isBooked}
              onClick={() => toggleSeat(seat)}
              className={`p-2 rounded font-bold
                ${isBooked ? "bg-gray-400 cursor-not-allowed" : ""}
                ${isSelected ? "bg-green-600 text-white" : ""}
                ${!isBooked && !isSelected ? "bg-blue-100" : ""}
              `}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <button
        onClick={continueBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
};

export default SeatSelection;
