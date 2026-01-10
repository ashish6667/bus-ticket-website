import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-blue-600">
        BusBook 🚍
      </h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/buses" className="hover:text-blue-600">
          Buses
        </Link>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
