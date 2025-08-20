import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let userConn;
let reviewConn;

export const connectDBs = async () => {
  try {
    // 🔹 Connect to Users DB
    userConn = await mongoose.createConnection(process.env.MONGO_URI_USERS, {});
    console.log(`✅ Connected to Users DB: ${userConn.name}`);

    // 🔹 Connect to Reviews DB
    reviewConn = await mongoose.createConnection(process.env.MONGO_URI_REVIEWS, {});
    console.log(`✅ Connected to Reviews DB: ${reviewConn.name}`);
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

export { userConn, reviewConn };
