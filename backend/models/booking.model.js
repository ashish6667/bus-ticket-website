import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    busId: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  { timestamps: true }
);

// Prevent duplicate seat booking
bookingSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
