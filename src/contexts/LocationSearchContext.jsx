/**
 * @file LocationSearchContext.jsx
 * @description Global "searched location" state for the personalized homepage.
 *   Stores the current city plus up to two previous cities (localStorage-backed)
 *   so the homepage can be scoped to a destination and offer quick re-search.
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const LocationSearchContext = createContext(null);

const STORAGE_KEY = 'expedition_go_location_search';

function loadStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        currentLocation: parsed.currentLocation ?? null,
        previousLocations: Array.isArray(parsed.previousLocations)
          ? parsed.previousLocations.slice(0, 2)
          : [],
      };
    }
  } catch {
    /* corrupt storage */
  }
  return { currentLocation: null, previousLocations: [] };
}

export function LocationSearchProvider({ children }) {
  const [data, setData] = useState(loadStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* quota exceeded */
    }
  }, [data]);

  const setLocation = useCallback((city) => {
    setData((prev) => {
      const normalized = (city || '').trim();
      if (!normalized) return prev;
      if (prev.currentLocation?.toLowerCase() === normalized.toLowerCase()) return prev;

      const newPrevious = prev.currentLocation
        ? [
            prev.currentLocation,
            ...prev.previousLocations.filter(
              (p) =>
                p.toLowerCase() !== normalized.toLowerCase() &&
                p.toLowerCase() !== prev.currentLocation.toLowerCase()
            ),
          ].slice(0, 2)
        : prev.previousLocations;

      return { currentLocation: normalized, previousLocations: newPrevious };
    });
  }, []);

  const resetLocation = useCallback(() => {
    setData({ currentLocation: null, previousLocations: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      currentLocation: data.currentLocation,
      previousLocations: data.previousLocations,
      setLocation,
      resetLocation,
      hasActiveSearch: data.currentLocation !== null,
    }),
    [data.currentLocation, data.previousLocations, setLocation, resetLocation]
  );

  return (
    <LocationSearchContext.Provider value={value}>
      {children}
    </LocationSearchContext.Provider>
  );
}

export function useLocationSearch() {
  const ctx = useContext(LocationSearchContext);
  if (!ctx) throw new Error('useLocationSearch must be used within a LocationSearchProvider');
  return ctx;
}
