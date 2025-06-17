import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Header from "./components/Header";
import Landingpage from "./Pages/Landingpage";
import "@fortawesome/fontawesome-free/css/all.min.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landingpage /> },

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

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
