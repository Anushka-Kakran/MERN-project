import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.warn("ProtectedRoute: No user found, redirecting to /login");
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
