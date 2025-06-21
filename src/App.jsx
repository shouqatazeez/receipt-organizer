import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import ReceiptGalleryPage from "@/pages/ReceiptGalleryPage";
import ReceiptUploadPage from "@/pages/ReceiptUploadPage";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import ProtectedRoute from "@/pages/ProtectedRoute";

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
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
