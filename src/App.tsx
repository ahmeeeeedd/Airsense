import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import Interactive from "./Pages/Interactive";
import { Home } from "./Pages/Home";
import Notification from "./Pages/Notification";
import Paramétre from "./Pages/Paramétre";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./layout/Layout";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { PasswordSignIn } from "./Pages/PasswordSignIn";
import { PasswordSignUp } from "./Pages/PasswordSignUp";
import { Missing } from "./Pages/Missing";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/Notification",
            element: <Notification />,
          },
          {
            path: "/Paramétre",
            element: <Paramétre />,
          },
          {
            path: "/Dashboard",
            element: <Dashboard />,
          },
          {
            path: "/Interactive",
            element: <Interactive />,
          },
        ],
      },

      {
        path: "/Sign-Up",
        element: <PasswordSignUp />,
      },
      {
        path: "/Sign-In",
        element: <PasswordSignIn />,
      },
    ],
  },
  {
    path: "*",
    element: <Missing />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
