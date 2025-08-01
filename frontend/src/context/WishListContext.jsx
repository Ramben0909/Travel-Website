// contexts/WishlistContext.js
import  { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const WishlistContext = createContext();

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add a place to wishlist
  const addToWishlist = (place) => {
    if (!wishlist.find((item) => item.id === place.id)) {
      setWishlist(prev => [...prev, place]);
      return true; // Successfully added
    }
    return false; // Already exists
  };

  // Remove a place from wishlist
  const removeFromWishlist = (placeId) => {
    setWishlist(prev => prev.filter((place) => place.id !== placeId));
  };

  // Check if a place is in wishlist
  const isInWishlist = (placeId) => {
    return wishlist.some((place) => place.id === placeId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};