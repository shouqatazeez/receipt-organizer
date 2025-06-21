import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Signup from "@/pages/Signup";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";

import ProtectedRoute from "@/pages/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Receiptuploadpage from "./Pages/Receiptuploadpage";
import ReceiptGalleryPage from "./Pages/ReceiptGalleryPage";
import LoginForm from "@/pages/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/upload", element: <Receiptuploadpage /> },
          { path: "/gallery", element: <ReceiptGalleryPage /> },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginForm /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
