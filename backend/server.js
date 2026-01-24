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

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/buses", async (req, res, next) => {
  await connectDB(); // Ensure DB connected
  next();
}, busRoutes);

app.use("/api/bookings", async (req, res, next) => {
  await connectDB();
  next();
}, bookingRoutes);

app.use("/api/payments", async (req, res, next) => {
  await connectDB();
  next();
}, paymentRoutes);

/* Health check */
app.get("/", async (req, res) => {
  await connectDB();
  res.send("Bus Ticket API running...");
});

export default app;
