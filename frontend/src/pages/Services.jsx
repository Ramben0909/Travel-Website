import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext"; // ✅ make sure path is correct

const Services = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuthContext();

  // ✅ Fetch Top Reviews
  const fetchTopReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/topreviews`);
      setTopReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  // ✅ Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!userReview.trim() || userRating < 1 || userRating > 5) {
      alert("Please provide a valid review and rating (1-5 stars).");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/addreview`, {
        userName: user?.name || "Anonymous",  // ✅ send user.name
        review: userReview,
        rating: userRating,
      });

      setUserReview("");
      setUserRating(0);
      fetchTopReviews(); // refresh list
    } catch (error) {
      console.error("Failed to submit review", error);
      alert("Error submitting review.");
    }
  };

  useEffect(() => {
    fetchTopReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>

      {/* ✅ Reviews Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Top Reviews</h3>
        {topReviews.length > 0 ? (
          <ul className="space-y-3">
            {topReviews.map((rev, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <p className="font-medium">⭐ {rev.rating}/5</p>
                <p className="italic">{rev.review}</p>
                <p className="text-sm text-gray-500">
                  {rev.userName || "Anonymous"} {/* ✅ match backend field */}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* ✅ Add Review Form */}
      {isAuthenticated ? (
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-2 rounded"
            rows="3"
          />
          <input
            type="number"
            value={userRating}
            onChange={(e) => setUserRating(Number(e.target.value))}
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="w-32 border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-red-500 mt-4">
          Please log in to submit a review.
        </p>
      )}
    </div>
  );
};

export default Services;
