import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function ProtectedRoute() {
  const { session, isLoading } = useSessionContext();

  if (isLoading) return null;

  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
}
