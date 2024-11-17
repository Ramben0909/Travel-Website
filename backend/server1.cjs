const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for local development
app.use(cors());

// Route to proxy the search request to SerpApi
app.get('/api/hotels', async (req, res) => {
  const { place } = req.query;  // Get place from query params
  const apiKey = '587c5c0f782fea68feabdb0c84e9e65363cf0bb245f253cbf33eb87b6e3758c4'; // Replace with your actual API key

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        api_key: apiKey,
        q: `hotels in ${place}`,
        location: place,
      },
    });

    res.json(response.data); // Send the SerpApi response back to the client
  } catch (error) {
    res.status(500).send('Error fetching data from SerpApi');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
