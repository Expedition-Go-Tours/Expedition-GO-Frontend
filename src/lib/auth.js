import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

// Authentication provider configuration
const AUTH_PROVIDER = import.meta.env.VITE_AUTH_PROVIDER || 'mock';

// Local storage key for user data
const AUTH_USER_KEY = 'expedition_go_auth_user';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
let app = null;
let auth = null;
let googleProvider = null;

if (AUTH_PROVIDER === 'firebase') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Configure Google provider
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

/**
 * Get the current authentication provider
 * @returns {string} The auth provider name
 */
export function getAuthProvider() {
  return AUTH_PROVIDER;
}

/**
 * Convert Firebase user to app user format
 * @param {object} firebaseUser - Firebase user object
 * @returns {object} Normalized user object
 */
function normalizeFirebaseUser(firebaseUser) {
  if (!firebaseUser) return null;
  
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    photoURL: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0]?.providerId || 'email',
  };
}

/**
 * Get stored authenticated user from localStorage
 * @returns {object|null} User object or null
 */
export function getStoredAuthUser() {
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get stored user:', error);
    return null;
  }
}

/**
 * Store authenticated user in localStorage
 * @param {object} user - User object to store
 */
function storeAuthUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (error) {
    console.error('Failed to store user:', error);
  }
}

/**
 * Remove authenticated user from localStorage
 */
function removeAuthUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.error('Failed to remove user:', error);
  }
}

// Auth state listeners
let authStateListeners = [];

/**
 * Notify all auth state listeners of user change
 * @param {object|null} user - Current user or null
 */
function notifyAuthStateChange(user) {
  authStateListeners.forEach(listener => listener(user));
}

/**
 * Subscribe to authentication state changes
 * @param {function} callback - Function to call when auth state changes
 * @returns {Promise<function>} Unsubscribe function
 */
export async function subscribeToAuthState(callback) {
  authStateListeners.push(callback);
  
  if (AUTH_PROVIDER === 'firebase' && auth) {
    // Use Firebase auth state observer
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const user = normalizeFirebaseUser(firebaseUser);
      storeAuthUser(user);
      callback(user);
    });
    
    return () => {
      authStateListeners = authStateListeners.filter(listener => listener !== callback);
      unsubscribe();
    };
  } else {
    // Mock mode - immediately call with current user
    const currentUser = getStoredAuthUser();
    callback(currentUser);
    
    return () => {
      authStateListeners = authStateListeners.filter(listener => listener !== callback);
    };
  }
}

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} User object
 */
export async function signInWithEmail(email, password) {
  if (AUTH_PROVIDER === 'firebase' && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = normalizeFirebaseUser(userCredential.user);
      storeAuthUser(user);
      notifyAuthStateChange(user);
      return user;
    } catch (error) {
      console.error('Firebase sign in error:', error);
      
      // Provide user-friendly error messages
      let message = 'Failed to sign in. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Please try again later.';
      }
      
      throw new Error(message);
    }
  }
  
  // Mock authentication for development
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = {
    uid: 'mock-' + Date.now(),
    email,
    emailVerified: true,
    name: email.split('@')[0],
    provider: 'email',
  };
  
  storeAuthUser(user);
  notifyAuthStateChange(user);
  return user;
}

/**
 * Register new user with email and password
 * @param {string} name - User's full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} User object
 */
export async function registerWithEmail(name, email, password) {
  if (AUTH_PROVIDER === 'firebase' && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      if (name) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      
      const user = normalizeFirebaseUser(userCredential.user);
      // Override name with the provided name
      user.name = name || user.name;
      
      storeAuthUser(user);
      notifyAuthStateChange(user);
      return user;
    } catch (error) {
      console.error('Firebase registration error:', error);
      
      // Provide user-friendly error messages
      let message = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = 'Email/password accounts are not enabled.';
      }
      
      throw new Error(message);
    }
  }
  
  // Mock registration for development
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = {
    uid: 'mock-' + Date.now(),
    email,
    emailVerified: false,
    name,
    provider: 'email',
  };
  
  storeAuthUser(user);
  notifyAuthStateChange(user);
  return user;
}

/**
 * Sign in with Google
 * @returns {Promise<object>} User object
 */
export async function signInWithGoogle() {
  if (AUTH_PROVIDER === 'firebase' && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = normalizeFirebaseUser(result.user);
      storeAuthUser(user);
      notifyAuthStateChange(user);
      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      
      // Provide user-friendly error messages
      let message = 'Failed to sign in with Google. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign in was cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'An account already exists with the same email but different sign-in method.';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = 'Google sign-in is not enabled.';
      }
      
      throw new Error(message);
    }
  }
  
  // Mock Google sign-in for development
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const user = {
    uid: 'google-mock-' + Date.now(),
    email: 'user@gmail.com',
    emailVerified: true,
    name: 'Google User',
    photoURL: 'https://via.placeholder.com/150',
    provider: 'google.com',
  };
  
  storeAuthUser(user);
  notifyAuthStateChange(user);
  return user;
}

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export async function signOutUser() {
  if (AUTH_PROVIDER === 'firebase' && auth) {
    try {
      await signOut(auth);
      removeAuthUser();
      notifyAuthStateChange(null);
      return;
    } catch (error) {
      console.error('Firebase sign out error:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }
  
  // Mock sign out
  await new Promise(resolve => setTimeout(resolve, 500));
  removeAuthUser();
  notifyAuthStateChange(null);
}
