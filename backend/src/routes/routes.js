import express from 'express';
import authRoutes from './authRoutes.js';
import contactRoutes from './contactRoute.js';
import wishlistRoutes from './wishlistRoutes.js';
import geminiRoutes from './geminiRoute.js';
import reviewRoutes from './reviewRoutes.js';   // ✅ import review routes

const router = express.Router();

console.log('✅ Review routes registered');

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/travel', geminiRoutes);
router.use('/reviews', reviewRoutes);   // ✅ register review routes

console.log('✅ All routes registered');

export default router;
