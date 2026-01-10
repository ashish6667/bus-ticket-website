// src/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
        BusBook 🚍
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/buses" className="hover:text-blue-600">
          Buses
        </Link>

        {loggedInUser ? (
          <>
            <span className="font-semibold">{loggedInUser.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
