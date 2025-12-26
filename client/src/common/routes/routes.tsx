import { HomeProtectedRoute } from "@/components/protected/home-protected";
import { LoginProtectedRoute } from "@/components/protected/login-protected";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import LoadingPage from "@/page/loading/loading";
import { SubscriptionsPage } from "@/page/subscriptions/subscriptions";

const ChatPage = lazy(() => import("@/page/chat/chat"));
const ProfilePage = lazy(() => import("@/page/profile/profile"));
const LoginPage = lazy(() => import("@/page/auth/login/login"));
const RegisterPage = lazy(() => import("@/page/auth/register/register"));
const NotFound = lazy(() => import("@/page/not-found/not-found"));

export function RoutePage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<LoginProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<HomeProtectedRoute />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/task" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
