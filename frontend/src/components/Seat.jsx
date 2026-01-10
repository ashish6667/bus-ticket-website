const Seat = ({ number, isBooked, isSelected, onSelect }) => {
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
      onClick={() => !isBooked && onSelect(number)}
    >
      {number}
    </div>
  );
};

export default Seat;
