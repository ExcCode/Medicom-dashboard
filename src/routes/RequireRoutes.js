import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function RequireMedical({ children }) {
  // if (!(role === "user")) {
  //   return <Navigate to="/" />;
  // }

  return children ? children : <Outlet />;
}

export function RequireAdmin({ children }) {
  // if (!(role === "admin")) {
  //   return <Navigate to="/" />;
  // }

  return children;
}
