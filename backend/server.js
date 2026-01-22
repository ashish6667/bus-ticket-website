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

/*  Stripe webhook MUST be raw */
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" })
);

/*  Normal middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Bus Ticket API running...");
});

/*  DO NOT app.listen() on Vercel */
export default app;
