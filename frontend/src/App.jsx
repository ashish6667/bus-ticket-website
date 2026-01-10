import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusList from "./pages/BusList";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import SeatSelection from "./pages/SeatSelection";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seats/:id" element={<SeatSelection/>} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
