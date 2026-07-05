import AuthLoader from "@/components/AuthLoader";
import { useAuth } from "@/components/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const { user } = useAuth();

  // still initializing
  if (user === undefined) return <AuthLoader />;

  // not logged in
  
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}

