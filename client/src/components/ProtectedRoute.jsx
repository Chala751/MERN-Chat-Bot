import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/chat" />;

  return children;
};

export default ProtectedRoute;
