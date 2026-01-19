import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        BusBook 🚍
      </h1>

      <div className="flex gap-5 items-center">
        <Link to="/">Home</Link>
        <Link to="/buses">Buses</Link>

        {user ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>

            <span className="font-semibold text-gray-700">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
