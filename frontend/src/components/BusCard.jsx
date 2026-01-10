import { Link } from "react-router-dom";

const BusCard = ({ bus }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold">{bus.name}</h2>
        <p className="text-gray-600">
          {bus.from} → {bus.to}
        </p>
        <p className="text-sm text-gray-500">
          {bus.departure} - {bus.arrival}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-green-600">
          ₹{bus.price}
        </p>
        <p className="text-sm text-gray-500">
          Seats Available: {bus.seats}
        </p>
        <Link
          to={`/seats/${bus.id}`}
          className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Seats
        </Link>
      </div>
    </div>
  );
};

export default BusCard;
