import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  return await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false, // keep this false
  });
}

export default connectDB;
