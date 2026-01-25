import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    busId: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
  },
  { timestamps: true }
);

bookingSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
