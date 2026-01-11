import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { cities } from "../data/cities";

const BusSearch = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  // Normalize helper
  const normalize = (val) => val.trim().toLowerCase();

  // Disable past dates
  const today = new Date().toISOString().split("T")[0];

  const filteredFrom = cities.filter(
    (c) =>
      c.toLowerCase().includes(normalize(from)) &&
      normalize(c) !== normalize(to)
  );

  const filteredTo = cities.filter(
    (c) =>
      c.toLowerCase().includes(normalize(to)) &&
      normalize(c) !== normalize(from)
  );

  // ✅ CASE-INSENSITIVE VALIDATION
  const isValid =
    cities.some((c) => normalize(c) === normalize(from)) &&
    cities.some((c) => normalize(c) === normalize(to)) &&
    normalize(from) !== normalize(to) &&
    date &&
    date >= today;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please select valid cities and upcoming date");
      return;
    }

    // Get proper city names
    const fromCity = cities.find(
      (c) => normalize(c) === normalize(from)
    );
    const toCity = cities.find(
      (c) => normalize(c) === normalize(to)
    );

    navigate(`/buses?from=${fromCity}&to=${toCity}&date=${date}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg grid gap-4 md:grid-cols-4 relative"
    >
      {/* FROM */}
      <div className="relative">
        <input
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            setShowFrom(true);
          }}
          onBlur={() => setTimeout(() => setShowFrom(false), 150)}
          placeholder="From"
          className="border p-3 rounded w-full"
        />

        {showFrom && from && (
          <ul className="absolute bg-white border w-full mt-1 rounded shadow z-10 max-h-40 overflow-auto">
            {filteredFrom.length ? (
              filteredFrom.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setFrom(city);
                    setShowFrom(false);
                  }}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {city}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No city found</li>
            )}
          </ul>
        )}
      </div>

      {/* TO */}
      <div className="relative">
        <input
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            setShowTo(true);
          }}
          onBlur={() => setTimeout(() => setShowTo(false), 150)}
          placeholder="To"
          className="border p-3 rounded w-full"
        />

        {showTo && to && (
          <ul className="absolute bg-white border w-full mt-1 rounded shadow z-10 max-h-40 overflow-auto">
            {filteredTo.length ? (
              filteredTo.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setTo(city);
                    setShowTo(false);
                  }}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {city}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No city found</li>
            )}
          </ul>
        )}
      </div>

      {/* DATE */}
      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
        className="border p-3 rounded"
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={!isValid}
        className={`rounded font-semibold transition ${
          isValid
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Search Buses
      </button>
    </form>
  );
};

export default BusSearch;
