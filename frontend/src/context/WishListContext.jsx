// src/context/WishlistContext.jsx
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import 'react-toastify/dist/ReactToastify.css';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isLoggedIn } = useAuthContext();

  const isInWishlist = (itemId) => wishlist.some((item) => item.id === itemId);

  const loadWishlistFromBackend = async () => {
    if (!user?.sub) return;
    try {
      const res = await fetch(`http://localhost:5001/api/wishlist/${user.sub}`, {
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
      await fetch(`http://localhost:5001/api/wishlist/${user.sub}`, {
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
      toast.success(`${item.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info(`${item.name} is already in your wishlist!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const removeFromWishlist = async (itemId, itemName) => {
    try {
      if (isLoggedIn && user?.sub) {
        await fetch(`http://localhost:5001/api/wishlist/${user.sub}/${itemId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }
      const updated = wishlist.filter((item) => item.id !== itemId);
      await updateWishlist(updated);
      toast.success(`${itemName || 'Item'} removed from wishlist`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
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
