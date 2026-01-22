import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { id: busId } = useParams();
  const navigate = useNavigate();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const TOTAL_SEATS = 40;
  const AMOUNT_PER_SEAT = 50; // INR

  // Load booked seats from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/seats/${busId}`);
        const data = await res.json();
        setBookedSeats(Array.isArray(data) ? data : data.bookedSeats || []);
      } catch (err) {
        toast.error("Failed to load booked seats");
      }
    };

    fetchBookedSeats();

    // Reset selected seats on mount
    setSelectedSeats([]);
    localStorage.removeItem(`selectedSeats_bus_${busId}`);
  }, [busId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error("Seat already booked");
      return;
    }

    setSelectedSeats((prev) => {
      const updated = prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat];
      localStorage.setItem(`selectedSeats_bus_${busId}`, JSON.stringify(updated));
      return updated;
    });
  };

  const proceedToPayment = () => {
    if (!selectedSeats.length) {
      toast.error("Select at least one seat");
      return;
    }

    const totalAmount = selectedSeats.length * AMOUNT_PER_SEAT;

    navigate("/payment", {
      state: {
        busId,
        seats: selectedSeats,
        amount: totalAmount,
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
              disabled={isBooked || loading}
              onClick={() => toggleSeat(seat)}
              className={`p-2 rounded font-bold
                ${isBooked ? "bg-gray-400 cursor-not-allowed" : ""}
                ${isSelected ? "bg-green-600 text-white" : ""}
                ${!isBooked && !isSelected ? "bg-blue-100" : ""}`}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <button
        onClick={proceedToPayment}
        className="w-full bg-green-600 text-white py-2 rounded"
        disabled={loading}
      >
        Continue
      </button>
    </div>
  );
};

export default SeatSelection;
