// pages/api/generate-itinerary.js
import { generateContent } from '../utils/geminiApi';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { destination, duration, interests, budget, pace } = req.body;

    const prompt = `Act as a travel expert and create a detailed ${duration}-day travel itinerary for ${destination}.
    Consider these preferences:
    - Interests: ${interests.join(', ')}
    - Budget: ${budget}
    - Travel pace: ${pace}
    
    Format the response as a JSON object with this structure:
    {
      "days": [
        {
          "day": 1,
          "activities": [
            {
              "time": "09:00 AM",
              "activity": "Activity description",
              "location": "Location name"
            }
          ]
        }
      ]
    }`;

    const response = await generateContent(prompt);
    const itinerary = JSON.parse(response);
    
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ message: 'Failed to generate itinerary' });
  }
}