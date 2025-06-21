import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";

import ProtectedRoute from "@/pages/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import ReceiptGalleryPage from "./Pages/ReceiptGalleryPage";
import LoginForm from "@/pages/Login";
import SignupForm from "@/pages/Signup";
import ReceiptUploadPage from "./Pages/Receiptuploadpage";

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
