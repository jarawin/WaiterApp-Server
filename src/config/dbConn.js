import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STR, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
