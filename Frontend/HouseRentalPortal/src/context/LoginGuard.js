import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import LandingPage from "./../widget/LandingPage";

const LoginGuard = ({ element: Element, ...rest }) => {
  const token = Cookies.get("token");
  return (
    <Route
      {...rest}
      element={
        token ? <Navigate to="/" /> : <LandingPage><Element /></LandingPage>
      }
    />
  );
};

export default LoginGuard;