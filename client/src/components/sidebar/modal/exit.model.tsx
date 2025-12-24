import { logout } from "@/api/service/auth/auth-servce";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideDoorOpen } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function ExitModel({ isText }: { isText: boolean }) {
  const navigate = useNavigate();

  const exit = () => {
    logout().then(() => {
      toast.success("Вы вышли из своей аккаунта");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
    navigate("/login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-500/90 hover:bg-red-500 transition-all duration-200"
        >
          <LucideDoorOpen size={20} />
          {isText && <span className="text-sm font-medium">Выйти</span>}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-center">
            Подтверждение выхода
          </h3>

          <DialogDescription className="text-center text-sm text-muted-foreground">
            Вы уверены, что хотите выйти из аккаунта?
          </DialogDescription>

          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-lg">
                Отмена
              </Button>
            </DialogClose>

            <Button
              onClick={exit}
              variant="destructive"
              className="rounded-lg bg-red-500 hover:bg-red-600"
            >
              Выйти
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
