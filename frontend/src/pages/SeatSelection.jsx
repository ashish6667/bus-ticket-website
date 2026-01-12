import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getBookedSeats,
  getUserSeats,
  bookSeat,
  cancelSeat,
} from "../utils/seatBooking";

const SeatSelection = () => {
  const { id } = useParams(); // bus id
  const navigate = useNavigate();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [mySeats, setMySeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [user, setUser] = useState(null);

  // Load logged in user and refresh seats
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(loggedUser);
    refreshSeats(loggedUser.email);
  }, [id]);

  // Refresh seat states
  const refreshSeats = (email) => {
    setBookedSeats(getBookedSeats(id));
    setMySeats(getUserSeats(id, email));
  };

  // Handle seat click
  const handleSeatClick = (seat) => {
    if (!user) return;

    // Cancel my seat
    if (mySeats.includes(seat)) {
      cancelSeat(id, seat, user.email);
      toast.success(`Seat ${seat} cancelled`);
      refreshSeats(user.email);
      return;
    }

    // Ignore booked seats
    if (bookedSeats.includes(seat)) return;

    // Select only one seat
    setSelectedSeat(seat === selectedSeat ? null : seat);
  };

  // Handle booking
  const handleBooking = () => {
    if (!selectedSeat || !user) return;

    const success = bookSeat(id, selectedSeat, user);
    if (!success) {
      toast.error("Seat already booked");
      refreshSeats(user.email);
      setSelectedSeat(null);
      return;
    }

    toast.success(`Seat ${selectedSeat} booked successfully`);

    setSelectedSeat(null);
    refreshSeats(user.email);

    // Redirect to payment
    navigate(`/payment/${id}`);
  };

  // Example: 20 seats per bus
  const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Seat</h2>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isMine = mySeats.includes(seat);
          const isSelected = seat === selectedSeat;

          let style =
            "w-10 h-10 flex items-center justify-center rounded font-semibold cursor-pointer ";

          if (isMine) style += "bg-red-600 text-white"; // my seats → red
          else if (isBooked)
            style += "bg-gray-400 text-white cursor-not-allowed"; // booked → gray
          else if (isSelected) style += "bg-green-600 text-white"; // selected → green
          else style += "bg-white border hover:bg-green-100"; // available

          return (
            <div
              key={seat}
              className={style}
              title={
                isMine
                  ? "Click to cancel booking"
                  : isBooked
                  ? "Already booked"
                  : ""
              }
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleBooking}
        disabled={!selectedSeat}
        className={`w-full py-2 rounded font-semibold transition
          ${
            selectedSeat
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }
        `}
      >
        Book Seat
      </button>
    </div>
  );
};

export default SeatSelection;
