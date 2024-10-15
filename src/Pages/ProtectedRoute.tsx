import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { OverlayLoader } from "../components/OverlayLoader"; // Optional loading spinner component
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedRoute: FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <OverlayLoader />; // Show loader until Firebase resolves
  }

  if (!user) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/Sign-In" />;
  }

  return <Outlet />;
};
