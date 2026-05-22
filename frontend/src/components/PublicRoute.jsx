import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("logindata");

  // Verify that the token exists and 'user' isn't just the literal string "null" or "undefined"
  const isAuthenticated = token && rawUser && rawUser !== "null" && rawUser !== "undefined";

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;