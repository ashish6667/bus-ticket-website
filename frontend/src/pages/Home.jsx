import BusSearch from "../components/BusSearch";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Book Bus Tickets 🚍
        </h1>

        <BusSearch />
      </div>
    </div>
  );
};

export default Home;
