/**
 * @file AuthProvider.jsx
 * @description React context for authenticated user state. Subscribes to lib/auth.js
 *   auth-state changes and exposes { user, loading, signOut } via useAuth().
 *
 * Mounted in App.jsx above all routes. While loading is true, AppContent shows
 * BrandLoader full-screen — prevents flash of unauthenticated UI.
 *
 * @see lib/auth.js for sign-in/sign-out implementations
 */
import { createContext, useContext, useEffect, useState } from "react";
import { getStoredAuthUser, signOutUser, subscribeToAuthState } from "@/lib/auth";

const AuthContext = createContext({
  loading: true,
  signOut: async () => {},
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuthUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    subscribeToAuthState((nextUser) => {
      if (!mounted) {
        return;
      }

      setUser(nextUser);
      setLoading(false);
    }).then((unsubscribe) => {
      if (!mounted) {
        unsubscribe?.();
        return;
      }

      cleanup = unsubscribe ?? (() => {});
    });

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  async function handleSignOut() {
    await signOutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        signOut: handleSignOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
