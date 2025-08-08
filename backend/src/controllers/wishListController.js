// controllers/wishlistController.js
import User from "../models/User.js";

/**
 * Get wishlist for a user
 */
export const getWishlist = async (req, res) => {
  const { auth0Id } = req.params;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add an item to wishlist
 */
export const addToWishlist = async (req, res) => {
  const { auth0Id } = req.params;
  const { name, latitude, longitude } = req.body;

  if (!name || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already exists
    const exists = user.wishlist.some(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase() &&
        item.latitude === latitude &&
        item.longitude === longitude
    );
    if (exists) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    user.wishlist.push({ name, latitude, longitude });
    await user.save();

    res.status(201).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Add Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Remove an item from wishlist
 */
export const removeFromWishlist = async (req, res) => {
  const { auth0Id, itemId } = req.params;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item._id.toString() !== itemId
    );
    await user.save();

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
