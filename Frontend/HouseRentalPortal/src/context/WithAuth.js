import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function WithAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = Cookies.get("token") !== undefined;
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };
}