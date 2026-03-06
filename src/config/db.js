import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Attempting to connect to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default connectDB;