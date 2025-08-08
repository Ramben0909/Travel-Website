import { useContext } from "react";
import { WishlistContext } from "./WishListContext";

export const useWishlist = () => useContext(WishlistContext);
