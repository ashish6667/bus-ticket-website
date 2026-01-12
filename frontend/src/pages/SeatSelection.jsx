import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { id } = useParams(); // busId
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleBooking = () => {
    if (!selectedSeat) {
      toast.error("Please select a seat");
      return;
    }

    navigate("/passenger", {
      state: {
        busId: id,
        seats: [selectedSeat],
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Seat</h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => setSelectedSeat(seat)}
            className={`p-2 border rounded ${
              selectedSeat === seat
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
};

export default SeatSelection;
