import express from 'express';
import authRoutes from './authRoutes.js';
import contactRoutes from './contactRoute.js';
import wishlistRoutes from './wishlistRoutes.js';
import geminiRoutes from './geminiRoute.js';

const router = express.Router();

console.log('🔍 Registering routes...');
console.log('Auth routes:', !!authRoutes);
console.log('Contact routes:', !!contactRoutes);
console.log('Wishlist routes:', !!wishlistRoutes);
console.log('Gemini routes:', !!geminiRoutes); // This should log 'true'

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/travel', geminiRoutes);

console.log('✅ All routes registered');

export default router;