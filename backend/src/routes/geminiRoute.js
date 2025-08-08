import express from 'express';
import { getTravelRecommendations } from '../controllers/travelController.js';

const router = express.Router();

router.post('/recommendations', getTravelRecommendations);

export default router;
