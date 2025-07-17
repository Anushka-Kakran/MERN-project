import { signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Google Sign-In
export const googleLogin = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error signing out before Google login:", err);
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Email/Password Sign-In
export const emailLogin = async (email, password) => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error signing out before email login:", err);
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Logout Utility
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
