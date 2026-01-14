import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/mongo.js";

import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB then start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
  });
});
