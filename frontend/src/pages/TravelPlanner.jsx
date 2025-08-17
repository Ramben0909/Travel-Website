// import { useState } from 'react';
// import axios from 'axios';
// import { MapPin, Search, Plane, Package } from 'lucide-react';

// const TravelPlanner = () => {
//     const [destination, setDestination] = useState('');
//     const [recommendations, setRecommendations] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const fetchTravelRecommendations = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5001/api/travel/recommendations', {
//                 destination: destination
//             });

//             setRecommendations(response.data.recommendations);
//         } catch (error) {
//             console.error("Error fetching travel recommendations:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         setDestination(e.target.value);
//     };

//     const handleSearch = () => {
//         if (destination) {
//             fetchTravelRecommendations();
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-white relative overflow-hidden">
//             {/* Background decorative elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-10"></div>
//             </div>

//             <div className="relative max-w-6xl mx-auto px-4 py-12">
//                 {/* Header Section */}
//                 <div className="text-center mb-12">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mb-6 shadow-lg">
//                         <Plane className="w-10 h-10 text-white" />
//                     </div>
//                     <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-sky-600 to-blue-800 bg-clip-text text-transparent mb-4">
//                         Travel Planner
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//                         Discover what to pack for your next adventure with AI-powered recommendations
//                     </p>
//                 </div>

//                 {/* Search Section */}
//                 <div className="max-w-2xl mx-auto mb-12">
//                     <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
//                         <div className="flex flex-col sm:flex-row items-center gap-4">
//                             <div className="relative w-full sm:flex-1">
//                                 <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                                 <input 
//                                     type="text"
//                                     placeholder="Where are you traveling to?"
//                                     value={destination}
//                                     onChange={handleInputChange}
//                                     className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-blue-100 bg-white/80 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
//                                 />
//                             </div>
//                             <button 
//                                 onClick={handleSearch}
//                                 className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                             >
//                                 <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//                                 Get Recommendations
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Loading State */}
//                 {loading && (
//                     <div className="text-center mb-8">
//                         <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-blue-100">
//                             <div className="relative">
//                                 <Package className="w-6 h-6 text-blue-600 animate-bounce" />
//                                 <div className="absolute inset-0 w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
//                             </div>
//                             <span className="text-blue-700 font-semibold text-lg">
//                                 Curating perfect items for {destination}...
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Recommendations Grid */}
//                 {recommendations.length > 0 && (
//                     <div className="mb-8">
//                         <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//                             Recommended Items for Your Trip
//                         </h2>
//                         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                             {recommendations.map((rec, index) => (
//                                 <div 
//                                     key={index} 
//                                     className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/50 hover:border-blue-200 transform hover:-translate-y-1"
//                                     style={{
//                                         animationDelay: `${index * 0.1}s`
//                                     }}
//                                 >
//                                     <div className="flex items-start gap-3 mb-3">
//                                         <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex-shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-300"></div>
//                                         <h3 className="text-lg font-bold text-blue-800 group-hover:text-blue-900 transition-colors duration-300">
//                                             {rec.item}
//                                         </h3>
//                                     </div>
//                                     <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                                         {rec.reason}
//                                     </p>
//                                     <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-200 to-sky-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Empty State */}
//                 {!loading && recommendations.length === 0 && (
//                     <div className="text-center">
//                         <div className="max-w-md mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-white/30">
//                             <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                                 <MapPin className="w-12 h-12 text-blue-500" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for Adventure?</h3>
//                             <p className="text-gray-600 leading-relaxed">
//                                 Enter your dream destination above and discover what essentials to pack for your perfect trip!
//                             </p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TravelPlanner;



import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Search, Plane, Package } from 'lucide-react';

const TravelPlanner = () => {
    const location = useLocation();
    const [destination, setDestination] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get place name from navigation state
    useEffect(() => {
        const placeName = location.state?.placeName;
        console.log('Received place name:', placeName); // Debug log
        console.log('Full location state:', location.state); // Debug log
        
        if (placeName) {
            setDestination(placeName);
            // Automatically fetch recommendations for the place from wishlist
            fetchTravelRecommendationsForPlace(placeName);
        }
    }, [location.state]);

    const fetchTravelRecommendations = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/travel/recommendations', {
                destination: destination
            });

            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching travel recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTravelRecommendationsForPlace = async (place) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/travel/recommendations', {
                destination: place
            });

            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching travel recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setDestination(e.target.value);
    };

    const handleSearch = () => {
        if (destination) {
            fetchTravelRecommendations();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-25 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full opacity-10"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mb-6 shadow-lg">
                        <Plane className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-sky-600 to-blue-800 bg-clip-text text-transparent mb-4">
                        Travel Planner
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover what to pack for your next adventure with AI-powered recommendations
                    </p>
                    {/* Show if coming from wishlist */}
                    {location.state?.placeName && (
                        <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                            📍 Planning for: {location.state.placeName}
                        </div>
                    )}
                </div>

                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative w-full sm:flex-1">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text"
                                    placeholder="Where are you traveling to?"
                                    value={destination}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-blue-100 bg-white/80 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
                                />
                            </div>
                            <button 
                                onClick={handleSearch}
                                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                Get Recommendations
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-blue-100">
                            <div className="relative">
                                <Package className="w-6 h-6 text-blue-600 animate-bounce" />
                                <div className="absolute inset-0 w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span className="text-blue-700 font-semibold text-lg">
                                Curating perfect items for {destination}...
                            </span>
                        </div>
                    </div>
                )}

                {/* Recommendations Grid */}
                {recommendations.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                            Recommended Items for Your Trip
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {recommendations.map((rec, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/50 hover:border-blue-200 transform hover:-translate-y-1"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex-shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-300"></div>
                                        <h3 className="text-lg font-bold text-blue-800 group-hover:text-blue-900 transition-colors duration-300">
                                            {rec.item}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                        {rec.reason}
                                    </p>
                                    <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-200 to-sky-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && recommendations.length === 0 && (
                    <div className="text-center">
                        <div className="max-w-md mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-white/30">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-12 h-12 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready for Adventure?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {destination ? 
                                    `Get personalized packing recommendations for ${destination} by clicking the search button!` :
                                    "Enter your dream destination above and discover what essentials to pack for your perfect trip!"
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelPlanner;