// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const location = useLocation();

  return loggedInUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
