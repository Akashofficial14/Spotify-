import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("logindata");

  // Verify that the token exists and 'user' isn't just the literal string "null" or "undefined"
  const isAuthenticated = token && rawUser && rawUser !== "null" && rawUser !== "undefined";

  console.log("Route Guard Status -> Authenticated:", !!isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;