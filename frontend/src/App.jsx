import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusList from "./pages/BusList";
import Login from "./pages/Login";
import SeatSelection from "./pages/SeatSelection";
import PassengerForm from "./pages/PassengerForm";
import Signup from "./pages/Signup";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/select-seat/:id" element={<SeatSelection />} />
          <Route path="/passenger" element={<PassengerForm />} />
          <Route path="/my-bookings" element={<BookingHistory />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
