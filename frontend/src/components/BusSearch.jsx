import { useNavigate } from "react-router-dom";

const BusSearch = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/buses");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg grid gap-4 md:grid-cols-4"
    >
      <input
        type="text"
        placeholder="From"
        className="border p-3 rounded"
        required
      />
      <input
        type="text"
        placeholder="To"
        className="border p-3 rounded"
        required
      />
      <input
        type="date"
        className="border p-3 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
      >
        Search Buses
      </button>
    </form>
  );
};

export default BusSearch;
