import { Navigate, Outlet } from "react-router-dom";
import AuthLoader from "@/components/AuthLoader";
import { useAuth } from "@/components/hooks/useAuth";

export default function ProtectedGuard({ role }) {
  const { user } = useAuth();

  if (user === undefined) return <AuthLoader />;

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 🔐 role check (optional)
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}