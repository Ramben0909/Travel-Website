// routes/wishlist.js
import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/wishListController.js';

const router = express.Router();

// GET wishlist for a user
router.get('/:auth0Id', getWishlist);

// Add new item to wishlist
router.post('/:auth0Id', addToWishlist);

// Remove item from wishlist
router.delete('/:auth0Id/:itemId', removeFromWishlist);

export default router;
