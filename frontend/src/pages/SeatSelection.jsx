import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookedSeats, bookSeat } from "../utils/seatBooking";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { id } = useParams(); // Bus ID
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // numbers
  const [mySeats, setMySeats] = useState([]); // numbers
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login");
      return;
    }

    setUserEmail(user.email);

    // Read raw bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const busBookings = Array.isArray(allBookings[id]) ? allBookings[id] : [];

    const allSeatNumbers = busBookings.map((b) => b.seatNumber);
    const mySeatNumbers = busBookings
      .filter((b) => b.userEmail === user.email)
      .map((b) => b.seatNumber);

    setBookedSeats(allSeatNumbers);
    setMySeats(mySeatNumbers);
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
        toast.error(`Seat ${seat} already booked`);
      }
    }

    if (success) {
      toast.success("Seats booked successfully!");
      setSelectedSeats([]);
      navigate("/my-bookings");
    }
  };

  const totalSeats = 20;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {seats.map((num) => {
          const isBooked = bookedSeats.includes(num);
          const isMine = mySeats.includes(num);
          const isSelected = selectedSeats.includes(num);

          return (
            <div
              key={num}
              title={isBooked ? "Already booked" : "Available"}
              onClick={() =>
                !isBooked && handleSelect(num)
              }
              className={`w-10 h-10 flex items-center justify-center rounded text-sm font-semibold
                ${
                  isBooked
                    ? isMine
                      ? "bg-red-600 text-white cursor-not-allowed"
                      : "bg-gray-400 text-white cursor-not-allowed"
                    : isSelected
                    ? "bg-green-500 text-white cursor-pointer"
                    : "bg-white border cursor-pointer hover:bg-green-100"
                }`}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border"></div> Available
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div> Selected
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400"></div> Booked
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600"></div> Your Seats
        </span>
      </div>

      <button
        onClick={handleBookSeats}
        disabled={!selectedSeats.length}
        className={`px-4 py-2 rounded font-semibold transition
          ${
            selectedSeats.length
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        Book Selected Seats
      </button>
    </div>
  );
};

export default SeatSelection;
