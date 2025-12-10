import { Navigate, Outlet } from "react-router";
import { SidebarComponent } from "../sidebar/sidebar";

export function HomeProtectedRoute() {
  const isAuth = localStorage.getItem("accessToken");

  if (!isAuth) return <Navigate to="/login" replace />;
  return (
    <div className="flex">
      <SidebarComponent />
      <Outlet />
    </div>
  );
}
