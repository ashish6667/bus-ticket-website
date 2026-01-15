import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
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
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

//  Prevent duplicate seat booking per bus
bookingSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
