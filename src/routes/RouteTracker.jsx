import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // ❌ متحفظش صفحات auth
    if (
      location.pathname !== "/auth" &&
      location.pathname !== "/forgot-password"
    ) {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [location]);

  return null;
}