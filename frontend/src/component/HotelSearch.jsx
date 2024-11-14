import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    const clientId = 'kr0xCrKYKpXrWrzrKyNSVy8UQuJCH643';
    const clientSecret = 'Fqnt6QSIBbdpGbjH';

    try {
      const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      setToken(response.data.access_token);
      setError('');
    } catch (error) {
      console.error('Error getting access token:', error);
      setError('Failed to authenticate with Amadeus API');
    }
  };

  const fetchHotels = async () => {
    if (!token) {
      setError('No access token available. Please try again.');
      return;
    }

    const cityCode = 'NYC'; // Replace with actual city code based on searchQuery

    try {
      const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHotels(response.data.data);
      setError('');
    } catch (error) {
      console.error('Error fetching hotels:', error);
      if (error.response && error.response.status === 401) {
        setError('Authentication failed. Refreshing token...');
        await getAccessToken();
        fetchHotels(); // Retry after refreshing token
      } else {
        setError('Error fetching hotels. Please try again.');
      }
    }
  };

  const handleSearch = () => {
    fetchHotels();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a place"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <div>
        {hotels.map((hotel) => (
          <div key={hotel.hotelId}>
            <h3>{hotel.name}</h3>
            <p>{hotel.address.cityName}, {hotel.address.countryCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelSearch;