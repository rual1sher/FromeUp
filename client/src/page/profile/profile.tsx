import { ProfileComponent } from "@/components/profile/profile";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return <ProfileComponent user={user} />;
}
