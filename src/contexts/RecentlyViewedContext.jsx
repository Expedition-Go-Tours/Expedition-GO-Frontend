import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const RecentlyViewedContext = createContext({
  recentlyViewed: [],
  addToRecentlyViewed: () => {},
  clearRecentlyViewed: () => {},
});

const MAX_RECENT_ITEMS = 12;

export function RecentlyViewedProvider({ children }) {
  const { user } = useAuth();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storageKey = user ? `recentlyViewed_${user.uid}` : 'recentlyViewed_guest';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recently viewed:', e);
      }
    }
  }, [user]);

  // Save to localStorage whenever it changes
  useEffect(() => {
    const storageKey = user ? `recentlyViewed_${user.uid}` : 'recentlyViewed_guest';
    if (recentlyViewed.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed, user]);

  const addToRecentlyViewed = (item) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((i) => i.title !== item.title);
      // Add to beginning
      const updated = [item, ...filtered];
      // Keep only MAX_RECENT_ITEMS
      return updated.slice(0, MAX_RECENT_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    const storageKey = user ? `recentlyViewed_${user.uid}` : 'recentlyViewed_guest';
    localStorage.removeItem(storageKey);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}
