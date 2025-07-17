import { createContext, useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = ({ email, method }) => {
    const userData = { email, method };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await signOut(auth);             
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Firebase sign out failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
