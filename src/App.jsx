import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import ProtectedRoute from "@/pages/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import SignupForm from "@/pages/SignUp";
import LoginForm from "@/pages/Login";
import ReceiptGalleryPage from "@/pages/ReceiptGalleryPage";
import ReceiptUploadPage from "@/pages/ReceiptUploadPage";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/upload", element: <ReceiptUploadPage /> },
          { path: "/gallery", element: <ReceiptGalleryPage /> },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginForm /> },
          { path: "/signup", element: <SignupForm /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
