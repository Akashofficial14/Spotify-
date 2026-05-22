import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import App from "../App";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import GoogleAuthSuccess from "../components/GoogleAuthSuccess";
// import SpotifyPhoneAuth from "../components/SpotifyPhoneAuth";

const AppRouter = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
        },
         {
          path: "/google-auth-success/:token",
          element: <GoogleAuthSuccess />,
        },
        // {
        //   path:"/mobile-number-login",
        //   element:<SpotifyPhoneAuth/>
        // }
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <HomeLayout />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
