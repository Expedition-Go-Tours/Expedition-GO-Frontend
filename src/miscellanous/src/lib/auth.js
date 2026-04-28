const AUTH_PROVIDER = import.meta.env.VITE_AUTH_PROVIDER ?? "firebase";
// Hardcoded for now as requested
const AUTH_API_BASE_URL = "http://localhost:5000"; 
const AUTH_STORAGE_KEY = "expedition-go-auth-user";

// --- HELPERS ---

/**
 *  THE SYNC BRIDGE
 * Hardcoded to your local backend to ensure MongoDB receives user data.
 */
async function syncUserWithBackend(user) {
  try {
    const [{ getFirebaseAuth }] = await Promise.all([
      import("./firebaseClient"),
    ]);

    const auth = await getFirebaseAuth();
    const token = await auth.currentUser.getIdToken(); 

    const response = await fetch(`${AUTH_API_BASE_URL}/api/v1/users/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Sync failed");

    console.log("Synced with MongoDB:", data);
  } catch (err) {
    console.error(" MongoDB Sync Error:", err.message);
  }
}

function readStoredAuthUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistAuthUser(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredAuthUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function toSerializableUser(user, provider = "firebase") {
  if (!user) return null;
  return {
    email: user.email ?? "",
    emailVerified: Boolean(user.emailVerified),
    name: user.displayName ?? user.name ?? "",
    provider,
    uid: user.uid ?? user.id ?? user.email ?? "",
  };
}

function mapFirebaseAuthError(error) {
  const code = error?.code;
  const messages = {
    "auth/email-already-in-use": "That email address is already in use.",
    "auth/invalid-email": "Invalid email address.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/weak-password": "Password should be at least 6 characters.",
  };
  return messages[code] ?? error?.message ?? "Authentication failed.";
}

// --- CORE AUTH FUNCTIONS ---

export async function registerWithFirebase({ name, email, password }) {
  const [{ createUserWithEmailAndPassword, sendEmailVerification, updateProfile }, { getFirebaseAuth }] =
    await Promise.all([import("firebase/auth"), import("./firebaseClient")]);

  try {
    const auth = await getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (name) {
      await updateProfile(result.user, { displayName: name });
    }

    await sendEmailVerification(result.user);

    const user = toSerializableUser(
      { ...result.user, displayName: result.user.displayName ?? name ?? "" },
      "firebase"
    );

    // Sync user data to MongoDB immediately after registration
    await syncUserWithBackend(user);

    persistAuthUser(user);
    return user;
  } catch (error) {
    throw new Error(mapFirebaseAuthError(error));
  }
}

export async function signInWithFirebase({ email, password }) {
  const [{ signInWithEmailAndPassword }, { getFirebaseAuth }] =
    await Promise.all([import("firebase/auth"), import("./firebaseClient")]);

  try {
    const auth = await getFirebaseAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);

    const user = toSerializableUser(result.user, "firebase");
    
    // Sync on sign-in handles cases where user exists in Firebase but not yet in Mongo
    await syncUserWithBackend(user);
    
    persistAuthUser(user);
    return user;
  } catch (error) {
    throw new Error(mapFirebaseAuthError(error));
  }
}

export async function signInWithGoogle() {
  const [{ GoogleAuthProvider, signInWithPopup }, { getFirebaseAuth }] = await Promise.all([
    import("firebase/auth"),
    import("./firebaseClient"),
  ]);

  try {
    const auth = await getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    const user = toSerializableUser(result.user, "firebase");

    // Sync Google user to MongoDB
    await syncUserWithBackend(user);

    persistAuthUser(user);
    return user;
  } catch (error) {
    throw new Error(mapFirebaseAuthError(error));
  }
}

export async function subscribeToAuthState(callback) {
  const [{ onAuthStateChanged }, { getFirebaseAuth }] = await Promise.all([
    import("firebase/auth"),
    import("./firebaseClient"),
  ]);

  const auth = await getFirebaseAuth();

  return onAuthStateChanged(auth, (firebaseUser) => {
    const user = firebaseUser ? toSerializableUser(firebaseUser, "firebase") : null;

    if (user) {
      persistAuthUser(user);
    } else {
      clearStoredAuthUser();
    }

    callback(user);
  });
}
export function getAuthProvider() {
  return AUTH_PROVIDER;
}

export async function signOutUser() {
  try {
    const [{ signOut }, { getFirebaseAuth }] = await Promise.all([
      import("firebase/auth"),
      import("./firebaseClient"),
    ]);
    const auth = await getFirebaseAuth();
    await signOut(auth);
  } finally {
    clearStoredAuthUser();
  }
}

export function getStoredAuthUser() {
  return readStoredAuthUser();
}

export async function registerWithEmail(payload) {
  return registerWithFirebase(payload);
}

export async function signInWithEmail(payload) {
  return signInWithFirebase(payload);
}
