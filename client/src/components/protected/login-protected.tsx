import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function LoginProtectedRoute() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
}
