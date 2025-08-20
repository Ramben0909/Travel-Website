import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/addreview", (req, res, next) => {
  console.log("👉 POST /api/reviews/addreview hit");
  console.log("👉 POST /api/reviews/addreview hit, body:", req.body);
  next();
}, createReview);

router.get("/topreviews", (req, res, next) => {
  console.log("👉 GET /api/reviews/topreviews hit");
  next();
}, getReviews);

export default router;
