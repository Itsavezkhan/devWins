import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config();

if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(dotenv => dotenv.config());
}

const MONGO_URL = process.env.MONGO_URL ;
// chnaged

const db = async () => {
  try {
    console.log("Mongo URL is:", process.env.MONGO_URL);

    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default db;
