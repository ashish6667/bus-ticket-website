import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/mongo.js";

import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* DB Middleware for all routes */
const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
};

/* API Routes */
app.use("/api/auth", dbConnectMiddleware, authRoutes);
app.use("/api/buses", dbConnectMiddleware, busRoutes);
app.use("/api/bookings", dbConnectMiddleware, bookingRoutes);
app.use("/api/payments", dbConnectMiddleware, paymentRoutes);

/* Health check */
app.get("/", dbConnectMiddleware, async (req, res) => {
  res.send("Bus Ticket API running...");
});

/* Default catch-all for unknown routes */
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
