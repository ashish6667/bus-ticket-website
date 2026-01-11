import React, { useState, useEffect } from "react";
import { getBookedSeats, bookSeat } from "../utils/seatBooking";

const Seat = ({ busId, date, number, isSelected, onSelect }) => {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const bookedSeats = getBookedSeats(busId, date);
    setIsBooked(bookedSeats.includes(number));
  }, [busId, date, number]);

  let baseStyle =
    "w-10 h-10 flex items-center justify-center rounded cursor-pointer text-sm font-semibold";

  if (isBooked) {
    baseStyle += " bg-gray-400 text-white cursor-not-allowed";
  } else if (isSelected) {
    baseStyle += " bg-green-600 text-white";
  } else {
    baseStyle += " bg-white border hover:bg-green-100";
  }

  return (
    <div
      className={baseStyle}
      onClick={() => {
        if (!isBooked) onSelect(number);
      }}
    >
      {number}
    </div>
  );
};

export default Seat;
