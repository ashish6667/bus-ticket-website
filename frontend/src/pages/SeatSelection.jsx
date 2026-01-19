import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getBookedSeats } from "../api/bookingApi";

const SeatSelection = () => {
  const { id } = useParams(); // busId from URL
  const navigate = useNavigate();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const TOTAL_SEATS = 40; // temporary (later fetch from backend)

  // Load booked seats and previous selections from localStorage
  useEffect(() => {
    getBookedSeats(id)
      .then((res) => {
        // Ensure bookedSeats is always an array
        const seatsArray = Array.isArray(res) ? res : res.bookedSeats || [];
        setBookedSeats(seatsArray);
      })
      .catch(() => toast.error("Failed to load seats"));

    // Load selected seats for this bus from localStorage
    const savedSeats = JSON.parse(localStorage.getItem(`selectedSeats_bus_${id}`));
    if (Array.isArray(savedSeats)) setSelectedSeats(savedSeats);
  }, [id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      toast.error("Seat already booked");
      return;
    }

    setSelectedSeats((prev) => {
      const updated = prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat];

      // Persist selected seats for refresh
      localStorage.setItem(`selectedSeats_bus_${id}`, JSON.stringify(updated));
      return updated;
    });
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
          const isBooked = Array.isArray(bookedSeats) && bookedSeats.includes(seat);
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
