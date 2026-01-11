import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { buses } from "../data/buses";

const BusList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  // Redirect to home if any query param is missing
  useEffect(() => {
    if (!from || !to || !date) {
      navigate("/"); // Go back to search page
    }
  }, [from, to, date, navigate]);

  // Filter buses safely
  const filteredBuses = buses.filter(
    (bus) =>
      from &&
      to &&
      bus.from.toLowerCase() === from.toLowerCase() &&
      bus.to.toLowerCase() === to.toLowerCase()
  );

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
                <p className="text-xl font-bold text-green-600">₹{bus.price}</p>
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
