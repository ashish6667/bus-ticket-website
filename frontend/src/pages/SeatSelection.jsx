import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookedSeats, bookSeat } from "../utils/seatBooking";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { id } = useParams(); // Bus ID
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login");
      return;
    }
    setUserEmail(user.email);

    const seats = getBookedSeats(id); // already numbers
    setBookedSeats(seats);
  }, [id, navigate]);

  const handleSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBookSeats = () => {
    let success = true;

    for (let seat of selectedSeats) {
      const booked = bookSeat(id, seat, userEmail);
      if (!booked) {
        success = false;
        toast.error(`Seat ${seat} is already booked!`);
      }
    }

    if (success) {
      toast.success("Seats booked successfully!");
      navigate("/my-bookings");
    } else {
      // Refresh booked seats if conflict
      const seats = getBookedSeats(id);
      setBookedSeats(seats);
      setSelectedSeats([]);
    }
  };

  const totalSeats = 20;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
      <div className="grid grid-cols-5 gap-3 mb-4">
        {seats.map((num) => (
          <div
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer text-sm font-semibold 
              ${bookedSeats.includes(num)
                ? "bg-gray-400 text-white cursor-not-allowed"
                : selectedSeats.includes(num)
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-green-100"}`}
            onClick={() => !bookedSeats.includes(num) && handleSelect(num)}
          >
            {num}
          </div>
        ))}
      </div>

      <button
        onClick={handleBookSeats}
        disabled={!selectedSeats.length}
        className={`px-4 py-2 rounded font-semibold transition
          ${selectedSeats.length
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"}`}
      >
        Book Selected Seats
      </button>
    </div>
  );
};

export default SeatSelection;
