import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busId: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departureTime: String,
    arrivalTime: String,
    price: Number,
    totalSeats: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
