import mongoose from "mongoose";
import { reviewConn } from "../config/db.js";

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Wrap model creation in a function
export const getReviewModel = () => {
  if (!reviewConn) {
    throw new Error("❌ reviewConn not initialized yet. Did you call connectDBs()?");
  }
  return reviewConn.model("Review", reviewSchema);
};
