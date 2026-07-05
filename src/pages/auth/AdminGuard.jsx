import AuthLoader from "@/components/AuthLoader";
import { useAuth } from "@/components/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard() {
  const { user } = useAuth();

  if (user === undefined) return <AuthLoader />;

  if (!user) return <Navigate to="/auth" replace />;

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
