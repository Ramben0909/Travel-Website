// src/context/WishListContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);

  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item.id === itemId);
  };

  const loadWishlistFromBackend = async () => {
    if (!user?.sub) return; // Don't fetch if no user
    
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${user.sub}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setWishlist(data);
      localStorage.setItem(`wishlist_${user.sub}`, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching wishlist from backend:", error);
      loadWishlistFromLocalStorage(); // Fallback to localStorage
    }
  };

  const loadWishlistFromLocalStorage = () => {
    const storageKey = user?.sub ? `wishlist_${user.sub}` : "wishlist_guest";
    const storedWishlist = localStorage.getItem(storageKey);
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  };

  const updateWishlistToBackend = async (newWishlist) => {
    if (!user?.sub) return;
    
    try {
      await fetch(`http://localhost:5000/api/wishlist/${user.sub}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newWishlist),
      });
    } catch (error) {
      console.error("Error updating wishlist to backend:", error);
    }
  };

  const updateWishlist = async (newWishlist) => {
    setWishlist(newWishlist);
    
    // Save to localStorage with user-specific key
    const storageKey = user?.sub ? `wishlist_${user.sub}` : "wishlist_guest";
    localStorage.setItem(storageKey, JSON.stringify(newWishlist));
    
    // Save to backend if user is logged in
    if (isLoggedIn && user?.sub) {
      await updateWishlistToBackend(newWishlist);
    }
  };

  const addToWishlist = async (item) => {
    if (!isInWishlist(item.id)) {
      const newWishlist = [...wishlist, item];
      await updateWishlist(newWishlist);
      alert(`${item.name} added to wishlist!`);
    } else {
      alert(`${item.name} is already in your wishlist!`);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      // If user is logged in, call backend DELETE endpoint
      if (isLoggedIn && user?.sub) {
        await fetch(`http://localhost:5000/api/wishlist/${user.sub}/${itemId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }
      
      // Update local state
      const updatedList = wishlist.filter((item) => item.id !== itemId);
      await updateWishlist(updatedList);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Load wishlist when user changes or component mounts
  useEffect(() => {
    if (isLoggedIn && user?.sub) {
      loadWishlistFromBackend();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [isLoggedIn, user?.sub]);

  // Clear wishlist when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setWishlist([]);
    }
  }, [isLoggedIn]);

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};