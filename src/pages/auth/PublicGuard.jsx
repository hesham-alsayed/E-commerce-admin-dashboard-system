import { Navigate, Outlet } from "react-router-dom";
import AuthLoader from "@/components/AuthLoader";
import { useAuth } from "@/components/hooks/useAuth";

export default function PublicGuard() {
  const { user } = useAuth();

  if (user === undefined) return <AuthLoader />;

  // 🔥 لو logged in → روح داشبورد
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
