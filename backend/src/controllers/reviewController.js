import Review from "../models/reviewModel.js";

// ✅ GET reviews
export const getReviews = async (req, res) => {
  console.log("👉 inside getReviews controller");

  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);

    console.log("👉 Reviews fetched:", reviews);

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        success: true,
        reviews: [],
        message: "No reviews found",
      });
    }

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (err) {
    console.error("❌ Error in getReviews:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: err.message,
    });
  }
};

// ✅ POST add review
export const createReview = async (req, res) => {
  console.log("👉 inside createReview controller, body:", req.body);

  try {
    const { userName, rating, review } = req.body;

    if (!userName || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields (userName, rating, review) are required",
      });
    }

    const newReview = new Review({
      userName,
      rating,
      review,
    });

    const savedReview = await newReview.save();

    console.log("✅ Review saved:", savedReview);

    res.status(201).json({
      success: true,
      review: savedReview,
    });
  } catch (err) {
    console.error("❌ Error in createReview:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating review",
      error: err.message,
    });
  }
};
