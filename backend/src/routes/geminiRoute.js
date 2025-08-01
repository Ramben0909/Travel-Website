import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/recommendations', async (req, res) => {
    const { destination } = req.body;

    if (!destination) {
        return res.status(400).json({ error: 'Destination is required' });
    }

    const prompt = `
You are a travel assistant.
List 5 useful items a traveler should carry when visiting ${destination}.
Give the name of the item and a short reason.
Respond in JSON format like:
[
  { "item": "Item Name", "reason": "Short reason." },
  ...
]
`;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const modelText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const jsonStart = modelText.indexOf('[');
        const jsonEnd = modelText.lastIndexOf(']');
        const jsonText = modelText.slice(jsonStart, jsonEnd + 1);

        const recommendations = JSON.parse(jsonText);

        return res.status(200).json({ recommendations });
    } catch (err) {
        console.error("Gemini API error:", err.message);
        return res.status(500).json({ error: 'Failed to get Gemini response' });
    }
});

export default router;
