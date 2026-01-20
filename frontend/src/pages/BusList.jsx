import { useSearchParams, useNavigate } from "react-router-dom";
import { buses } from "../data/buses";

const BusList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const filteredBuses =
    from && to
      ? buses.filter(
          (bus) =>
            bus.from.toLowerCase() === from.toLowerCase() &&
            bus.to.toLowerCase() === to.toLowerCase()
        )
      : [];

  //  If user opened /buses directly
  if (!from || !to || !date) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-3">
            Search buses to continue 🚍
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Buses from <span className="text-blue-600">{from}</span> to{" "}
        <span className="text-blue-600">{to}</span>
      </h1>

      <p className="mb-6 text-gray-600">
        Journey Date: <strong>{date}</strong>
      </p>

      {filteredBuses.length === 0 ? (
        <p className="text-red-600 font-semibold">
          No buses available for this route
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{bus.name}</h2>
                <p className="text-sm text-gray-600">
                  {bus.departure} → {bus.arrival}
                </p>
                <p className="text-sm text-gray-600">Seats: {bus.seats}</p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  ₹{bus.price}
                </p>
                <button
                  onClick={() => navigate(`/select-seat/${bus.id}`)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusList;
