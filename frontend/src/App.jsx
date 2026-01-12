import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusList from "./pages/BusList";
import Login from "./pages/Login";
import SeatSelection from "./pages/SeatSelection";
import PassengerForm from "./pages/PassengerForm";
import Signup from "./pages/Signup";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/select-seat/:id" element={<SeatSelection />} />
          <Route path="/passenger" element={<PassengerForm />} />
          <Route path="/my-bookings" element={<BookingHistory />} />
          <Route path="/payment/:id" element={<Payment />} />
        </Route>

        {/* Auth routes (outside layout if you want) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
