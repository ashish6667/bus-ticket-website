import BusCard from "../components/BusCard";
import { buses } from "../data/buses";

const BusList = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      {buses.map((bus) => (
        <BusCard key={bus.id} bus={bus} />
      ))}
    </div>
  );
};

export default BusList;
