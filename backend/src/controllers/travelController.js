import axios from 'axios';

export const getTravelRecommendations = async (req, res) => {
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
    console.log("Sending prompt to Perplexity:", prompt);

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar-pro',  //  Supported model
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
        }
      }
    );

    const modelText = response.data.choices?.[0]?.message?.content || '';

    const jsonStart = modelText.indexOf('[');
    const jsonEnd = modelText.lastIndexOf(']');
    const jsonText = modelText.slice(jsonStart, jsonEnd + 1);

    let recommendations;
    try {
      recommendations = JSON.parse(jsonText);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message);
      return res.status(500).json({ error: 'Invalid JSON from model', raw: modelText });
    }

    return res.status(200).json({ recommendations });

  } catch (err) {
    console.error("Perplexity API error:", err.response?.status, err.response?.data || err.message);
    return res.status(500).json({ error: 'Perplexity API request failed' });
  }
};
