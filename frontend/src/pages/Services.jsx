import { useEffect, useState } from "react";
import Navbar from '../component/Navbar';
import axios from 'axios';
import { MapPin, Route, Package, Heart, Star, ChevronRight } from 'lucide-react';

function Services() {
    const [userReview, setUserReview] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [topReviews, setTopReviews] = useState([]);

    const fetchTopReviews = async () => {
        try {
            const res = await axios.get('/api/services/topreviews');
            setTopReviews(res.data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!userReview.trim() || userRating < 1 || userRating > 5) {
            alert("Please provide a valid review and rating (1-5 stars).");
            return;
        }

        try {
            await axios.post('/api/services/addreview', {
                review: userReview,
                rating: userRating,
            });
            setUserReview("");
            setUserRating(0);
            fetchTopReviews();
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Error submitting review.");
        }
    };

    useEffect(() => {
        fetchTopReviews();
    }, []);

    const services = [
        {
            icon: <MapPin className="h-8 w-8 text-blue-600" />,
            title: "Nearby Destinations",
            description: "Get destination recommendations based on your current location with real-time data and personalized suggestions.",
            gradient: "from-blue-50 to-indigo-50"
        },
        {
            icon: <Route className="h-8 w-8 text-blue-600" />,
            title: "Shortest Route & Nearby Hotels",
            description: "Click on a destination to view the most efficient route with integrated hotel booking and local amenities.",
            gradient: "from-indigo-50 to-purple-50"
        },
        {
            icon: <Package className="h-8 w-8 text-blue-600" />,
            title: "Destination-specific Travel Essentials",
            description: "Know what to pack with a smart checklist tailored to the terrain, weather, and local customs.",
            gradient: "from-purple-50 to-pink-50"
        },
        {
            icon: <Heart className="h-8 w-8 text-blue-600" />,
            title: "Personal Wishlist",
            description: "Bookmark dream destinations and manage your wishlist with ease. Share and collaborate with fellow travelers.",
            gradient: "from-pink-50 to-blue-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            
            
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform rotate-3 scale-110"></div>
                </div>
                
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6">
                            Travel Services
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover amazing destinations, plan perfect routes, and create unforgettable memories with our comprehensive travel platform.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                        {/* Highlight Block */}
                        <div className="relative lg:w-1/2">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <img
                                    className="absolute top-0 h-full w-full object-cover opacity-20"
                                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                    alt="Travel"
                                />
                                <div className="relative p-8 lg:p-12 min-h-[400px] flex flex-col justify-end">
                                    <div className="absolute top-8 left-8">
                                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                            <Star className="h-5 w-5 text-yellow-300 fill-current" />
                                            <span className="text-white font-medium">Premium Service</span>
                                        </div>
                                    </div>
                                    
                                    <blockquote className="mb-8">
                                        <p className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                                            Real-time travel suggestions tailored for your location and interests.
                                        </p>
                                    </blockquote>
                                    
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <img
                                                className="h-14 w-14 rounded-full object-cover ring-4 ring-white/30"
                                                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                                alt="Traveler"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full w-5 h-5 border-2 border-white"></div>
                                        </div>
                                        <div className="ml-4 text-white">
                                            <p className="text-lg font-bold">Alex Carter</p>
                                            <p className="text-blue-200 flex items-center">
                                                Travel Blogger
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="lg:w-1/2">
                            <div className="grid gap-6 h-full">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`group bg-gradient-to-br ${service.gradient} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/60`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                {service.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-white/70 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
                            Traveler Experiences
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover what our community of travelers has to say about their adventures
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {topReviews.length === 0 && (
                            <div className="col-span-full text-center py-16">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
                                    <Star className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                                    <p className="text-xl text-gray-600 mb-2">No reviews yet</p>
                                    <p className="text-gray-500">Be the first to share your travel experience!</p>
                                </div>
                            </div>
                        )}
                        {topReviews.map((review, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-yellow-400 text-2xl">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`inline-block h-5 w-5 ${
                                                        i < review.rating ? 'fill-current' : 'text-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {review.rating}/5
                                        </span>
                                    </div>
                                </div>
                                
                                <blockquote className="mb-6">
                                    <p className="text-lg leading-relaxed text-gray-700 italic">
                                        "{review.text}"
                                    </p>
                                </blockquote>
                                
                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">
                                            User #{review.id}
                                        </p>
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {review.id?.toString().slice(-1) || '?'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Review Form Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                            <h3 className="text-3xl font-bold text-white mb-2">Share Your Experience</h3>
                            <p className="text-blue-100">Help other travelers by sharing your journey</p>
                        </div>
                        
                        <div className="p-8">
                            <form onSubmit={handleReviewSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-lg font-semibold text-gray-800 mb-3">
                                        Your Review
                                    </label>
                                    <textarea
                                        className="w-full border-2 border-gray-200 rounded-2xl p-6 text-gray-800 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none"
                                        placeholder="Tell us about your travel experience..."
                                        rows="6"
                                        value={userReview}
                                        onChange={(e) => setUserReview(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                    <div className="flex-1">
                                        <label className="block text-lg font-semibold text-gray-800 mb-3">
                                            Your Rating
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                                                value={userRating}
                                                onChange={(e) => setUserRating(Number(e.target.value))}
                                            >
                                                <option value={0}>Select Rating</option>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <option key={star} value={star}>
                                                        {star} {"★".repeat(star)} - {
                                                            star === 1 ? "Poor" :
                                                            star === 2 ? "Fair" :
                                                            star === 3 ? "Good" :
                                                            star === 4 ? "Very Good" : "Excellent"
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    
                                    <div className="sm:pt-8">
                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                                        >
                                            <span>Submit Review</span>
                                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;