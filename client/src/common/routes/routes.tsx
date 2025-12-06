import { App } from "@/components/app";
import { Login } from "@/components/auth/login/login";
import { Route, Routes } from "react-router";

export function RoutePage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<App />} />
    </Routes>
  );
}
