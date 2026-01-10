import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusList from "./pages/BusList";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import SeatSelection from "./pages/SeatSelection";
import PassengerForm from "./pages/PassengerForm";
import Signup from "./pages/Signup";
import BookingHistory from "./pages/BookingHistory";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seats/:id" element={<SeatSelection/>} />
        <Route path="/passenger" element={<PassengerForm/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/my-bokings" element={<BookingHistory/>} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
