// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); //  JWT token
  const location = useLocation();

  //  No token → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  //  Token exists → allow access
  return <Outlet />;
};

export default ProtectedRoute;
