import { useEffect, useState } from "react";
import axios from "axios";
import { Star, MessageCircle, User, Send } from "lucide-react";
import { useAuthContext } from "../context/useAuthContext"; // ✅ make sure path is correct

const Services = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuthContext();

  // ✅ Get backend URL from environment variables (Vite)
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

  // ✅ Fetch Top Reviews
  const fetchTopReviews = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/reviews/topreviews`);
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
      await axios.post(`${BACKEND_URL}/api/reviews/addreview`, {
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

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Helper function to render rating selector
  const renderRatingSelector = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setUserRating(index + 1)}
        className={`p-1 rounded-md transition-colors duration-200 ${
          index < userRating
            ? "text-yellow-400"
            : "text-gray-300 hover:text-yellow-300"
        }`}
      >
        <Star
          className={`w-6 h-6 ${
            index < userRating ? "fill-yellow-400" : "hover:fill-yellow-300"
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center py-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-3">Our Services</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900">Customer Reviews</h3>
          </div>
          
          {topReviews.length > 0 ? (
            <div className="grid gap-4 mb-8">
              {topReviews.map((rev, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-blue-900">
                        {rev.userName || "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(rev.rating)}
                      <span className="ml-2 text-sm font-medium text-blue-700">
                        {rev.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Add Review Form */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Share Your Experience</h3>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Your Review
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Tell us about your experience with our services..."
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-blue-50/30 hover:bg-blue-50/50"
                  rows="4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-3">
                  Your Rating
                </label>
                <div className="flex items-center gap-1 mb-2">
                  {renderRatingSelector()}
                </div>
                <p className="text-sm text-gray-500">
                  {userRating > 0 ? `You rated: ${userRating} star${userRating > 1 ? 's' : ''}` : 'Click stars to rate'}
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-blue-500">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Want to Leave a Review?</h3>
            <p className="text-gray-600 mb-4">
              Please log in to share your experience and help others make informed decisions.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium">
              Please log in to submit a review
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;