import React, { useState } from 'react';
import axios from 'axios';

const HotelSearch = () => {
  const [place, setPlace] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  // Function to handle the search
  const handleSearch = async () => {
    // Resetting the previous search results
    setHotels([]);
    setError('');

    if (!place) {
      setError('Please enter a location.');
      return;
    }

    try {
      // Send the search request to your backend API (not directly to SerpApi)
      const response = await axios.get(`http://localhost:5000/api/hotels`, {
        params: { place },
      });

      // Handle the response
      if (response.data && response.data.organic_results) {
        setHotels(response.data.organic_results);
      } else {
        setError('No hotels found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Hotel Search</h1>
      <input
        type="text"
        placeholder="Enter a location"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {hotels.length > 0 ? (
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index}>
                <h3>{hotel.title}</h3>
                <p>{hotel.snippet}</p> {/* Display relevant hotel information */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels to display.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
