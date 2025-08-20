import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let userConn;
let reviewConn;

export const connectDBs = async () => {
  try {
    // Users DB
    userConn = mongoose.createConnection(process.env.MONGO_URI_USERS, {});
    await userConn.asPromise();
    console.log(`✅ Connected to Users DB: ${userConn.name}`);

    // Reviews DB
    reviewConn = mongoose.createConnection(process.env.MONGO_URI_REVIEWS, {});
    await reviewConn.asPromise();
    console.log(`✅ Connected to Reviews DB: ${reviewConn.name}`);
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

export { userConn, reviewConn };
