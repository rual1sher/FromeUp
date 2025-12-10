import { HomeProtectedRoute } from "@/components/protected/home-protected";
import { LoginProtectedRoute } from "@/components/protected/login-protected";
import { LoginPage } from "@/page/auth/login/login";
import { ChatPage } from "@/page/chat/chat";
import NotFound from "@/page/not-found/not-found";
import { Route, Routes } from "react-router";

export function RoutePage() {
  return (
    <Routes>
      <Route element={<LoginProtectedRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<HomeProtectedRoute />}>
        <Route path="/" element={<ChatPage />} />
        <Route path="/task" element={<ChatPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
