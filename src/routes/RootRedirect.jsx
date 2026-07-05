import AuthLoader from "@/components/AuthLoader";
import { useAuth } from "@/components/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RootRedirect() {
  const { user } = useAuth();

  if (user === undefined) return <AuthLoader />;

  return <Navigate to={user ? "/admin/dashboard" : "/auth"} replace />;
}
