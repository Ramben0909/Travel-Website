import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar'

const TravelPlanner = () => {
    const [destination, setDestination] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTravelRecommendations = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://api.gemini.com/travel/recommendations', {
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
        <div>
            <Navbar />
            <h1>Travel Planner</h1>
            <input 
                type="text" 
                placeholder="Enter destination" 
                value={destination} 
                onChange={handleInputChange} 
            />
            <button onClick={handleSearch}>Get Recommendations</button>
            
            {loading && <p>Loading recommendations...</p>}
            
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>
                        <h2>{rec.name}</h2>
                        <p>{rec.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelPlanner;
