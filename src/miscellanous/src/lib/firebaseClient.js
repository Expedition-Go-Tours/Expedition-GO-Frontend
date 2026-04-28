import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

function hasFirebaseConfig() {
  return Object.values(firebaseConfig).every(Boolean);
}

let firebaseApp;
let firebaseAuth;
let persistencePromise;

export async function getFirebaseAuth() {
  if (!hasFirebaseConfig()) {
    throw new Error(
      "Firebase env vars are missing. Add the VITE_FIREBASE_* values before using Firebase auth.",
    );
  }

  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
  }

  if (!persistencePromise) {
    persistencePromise = setPersistence(firebaseAuth, browserLocalPersistence);
  }

  await persistencePromise;

  return firebaseAuth;
}
