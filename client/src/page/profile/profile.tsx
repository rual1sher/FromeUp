import { ProfileComponent } from "@/components/profile/profile";
import { useAuth } from "@/store/auth.store";

export default function ProfilePage() {
  const { user } = useAuth();

  const handlEdit = () => {
    console.log("data");
  };

  return <ProfileComponent user={user} onEdit={handlEdit} />;
}
