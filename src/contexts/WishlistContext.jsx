import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      // Check if item already exists
      const exists = prev.some((i) => i.title === item.title);
      if (exists) {
        return prev;
      }
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (itemTitle) => {
    setWishlist((prev) => prev.filter((item) => item.title !== itemTitle));
  };

  const isInWishlist = (itemTitle) => {
    return wishlist.some((item) => item.title === itemTitle);
  };

  const toggleWishlist = (item) => {
    if (isInWishlist(item.title)) {
      removeFromWishlist(item.title);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
