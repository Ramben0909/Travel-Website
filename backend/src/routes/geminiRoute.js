import express from 'express';
import { getTravelRecommendations } from '../controllers/travelController.js';

console.log('🔍 Travel controller loaded:', !!getTravelRecommendations);

const router = express.Router();

// Add a test route
router.get('/test', (req, res) => {
  res.json({ message: 'Gemini route is working!' });
});

router.post('/recommendations', getTravelRecommendations);

export default router;