import { useState } from "react";
import { useParams } from "react-router-dom";
import Seat from "../components/Seat";

const SeatSelection = () => {
  const { id } = useParams();

  const totalSeats = 32;
  const bookedSeats = [2, 5, 12, 18];
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Select Seats (Bus #{id})
      </h1>

      <div className="grid grid-cols-4 gap-4 w-max bg-white p-6 rounded-xl shadow">
        {[...Array(totalSeats)].map((_, i) => (
          <Seat
            key={i}
            number={i + 1}
            isBooked={bookedSeats.includes(i + 1)}
            isSelected={selectedSeats.includes(i + 1)}
            onSelect={toggleSeat}
          />
        ))}
      </div>

      <div className="mt-6">
        <p className="font-semibold">
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </p>

        <button
          disabled={selectedSeats.length === 0}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          Proceed to Book
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
