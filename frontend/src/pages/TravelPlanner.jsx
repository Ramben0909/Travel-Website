import { useState } from 'react';
import axios from 'axios';
 

const TravelPlanner = () => {
    const [destination, setDestination] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleInputChange = (e) => {
        setDestination(e.target.value);
    };

    const handleSearch = () => {
        if (destination) {
            fetchTravelRecommendations();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-white text-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-center mb-6">✈️ Travel Planner</h1>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <input 
                        type="text"
                        placeholder="Enter destination..."
                        value={destination}
                        onChange={handleInputChange}
                        className="w-full sm:w-3/4 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button 
                        onClick={handleSearch}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
                    >
                        Get Recommendations
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-blue-600 font-medium animate-pulse mb-4">
                        Fetching items to pack for your trip...
                    </p>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-lg font-bold text-blue-700">{rec.item}</h2>
                            <p className="text-gray-600">{rec.reason}</p>
                        </div>
                    ))}
                </div>

                {!loading && recommendations.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        No recommendations yet. Enter a destination to get started!
                    </p>
                )}
            </div>
        </div>
    );
};

export default TravelPlanner;
