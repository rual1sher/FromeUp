import { Outlet } from "react-router";
import { SidebarComponent } from "../sidebar/sidebar";
import { useEffect } from "react";
import { me } from "@/api/service/auth/auth-servce";
import { useAuth } from "@/store/auth.store";

export function HomeProtectedRoute() {
  const { setUser } = useAuth();

  useEffect(() => {
    me().then((res) => setUser(res));
  }, []);
  return (
    <div className="flex">
      <SidebarComponent />
      <Outlet />
    </div>
  );
}
