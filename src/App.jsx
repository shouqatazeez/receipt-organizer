import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";

import ProtectedRoute from "@/pages/ProtectedRoute";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Receiptuploadpage from "./Pages/Receiptuploadpage";
import ReceiptGalleryPage from "./Pages/ReceiptGalleryPage";

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
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
