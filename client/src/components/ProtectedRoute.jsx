import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("smartgaonToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}