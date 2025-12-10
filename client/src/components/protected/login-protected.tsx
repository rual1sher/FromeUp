import { Navigate, Outlet } from "react-router";

export function LoginProtectedRoute() {
  const isAuth = localStorage.getItem("accessToken");

  if (isAuth) return <Navigate to="/" replace />;
  return <Outlet />;
}
