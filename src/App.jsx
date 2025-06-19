// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AppLayout from "@/layouts/AppLayout";
// import AuthLayout from "@/layouts/AuthLayout";
// import Login from "@/pages/Login";
// import Signup from "@/pages/Signup";
// import LandingPage from "@/pages/LandingPage";
// import Dashboard from "@/pages/Dashboard"; // include your dashboard page
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       { path: "/", element: <LandingPage /> },
//       { path: "/dashboard", element: <Dashboard /> },

//       {
//         element: <AuthLayout />,
//         children: [
//           { path: "/login", element: <Login /> },
//           { path: "/signup", element: <Signup /> },
//         ],
//       },
//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }

// App.jsx
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

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Public landing page
      { path: "/", element: <LandingPage /> },

      // 🔒 Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/upload", element: <Receiptuploadpage /> },

          // later add /upload or /gallery here
        ],
      },

      // Public auth routes
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
