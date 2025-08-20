import { getReviewModel } from "../models/Review.js";

export const createReview = async (req, res) => {
  const Review = getReviewModel(); // ✅ get model from reviewConn
  try {
    const { userName, review, rating } = req.body;

    if (!userName || !review || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReview = new Review({ userName, review, rating });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("❌ Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const getReviews = async (req, res) => {
  const Review = getReviewModel();
  try {
    console.log("👉 inside getReviews controller");

    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({ reviews }); // ✅ must send JSON object
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
