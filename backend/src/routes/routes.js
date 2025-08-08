import express from 'express';
import authRoutes from './authRoutes.js';
import contactRoutes from './contactRoutes.js';
import travelRoutes from './travelRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/api/travel', travelRoutes);
router.use('/api/wishlist', wishlistRoutes); 

export default router;
