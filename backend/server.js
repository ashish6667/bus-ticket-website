import express from "express";
import cors from "cors";
import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//  Root test route
app.get("/", (req, res) => {
  res.send("Backend running successfully ");
});

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
