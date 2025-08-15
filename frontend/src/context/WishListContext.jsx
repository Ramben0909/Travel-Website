// src/context/WishlistContext.jsx
import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isLoggedIn } = useAuthContext();

  const isInWishlist = (itemId) => wishlist.some((item) => item.id === itemId);

  const loadWishlistFromBackend = async () => {
    if (!user?.sub) return;
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${user.sub}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setWishlist(data);
      localStorage.setItem(`wishlist_${user.sub}`, JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      loadWishlistFromLocalStorage();
    }
  };

  const loadWishlistFromLocalStorage = () => {
    const storageKey = user?.sub ? `wishlist_${user.sub}` : "wishlist_guest";
    const stored = localStorage.getItem(storageKey);
    if (stored) setWishlist(JSON.parse(stored));
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
    const storageKey = user?.sub ? `wishlist_${user.sub}` : "wishlist_guest";
    localStorage.setItem(storageKey, JSON.stringify(newWishlist));
    if (isLoggedIn && user?.sub) {
      await updateWishlistToBackend(newWishlist);
    }
  };

  const addToWishlist = async (item) => {
    if (!isInWishlist(item.id)) {
      const updated = [...wishlist, item];
      await updateWishlist(updated);
      alert(`${item.name} added to wishlist!`);
    } else {
      alert(`${item.name} is already in wishlist!`);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      if (isLoggedIn && user?.sub) {
        await fetch(`http://localhost:5000/api/wishlist/${user.sub}/${itemId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }
      const updated = wishlist.filter((item) => item.id !== itemId);
      await updateWishlist(updated);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?.sub) {
      loadWishlistFromBackend();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [isLoggedIn, user?.sub]);

  useEffect(() => {
    if (!isLoggedIn) setWishlist([]);
  }, [isLoggedIn]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
