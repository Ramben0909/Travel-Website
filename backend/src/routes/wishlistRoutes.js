import express from 'express';
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem
} from '../controllers/wishListController.js';

const router = express.Router();

// GET wishlist for a user
router.get('/:auth0Id', getWishlist);

// Add new item to wishlist
router.post('/:auth0Id', addWishlistItem);

// Remove item from wishlist
router.delete('/:auth0Id/:itemId', removeWishlistItem);

export default router;
