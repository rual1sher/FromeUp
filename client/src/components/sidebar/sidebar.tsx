import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  MessageSquare,
  ListChecks,
  User,
  CreditCard,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";
import { ExitModel } from "./modal/exit.model";
import { useAuthStore } from "@/store/auth.store";
import { CreateGroupModal } from "../group/modal/create";

export function SidebarComponent() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: me } = useAuthStore();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  function isLocation(path: string[]) {
    return path.includes(location.pathname);
  }

  return (
    <div
      className={cn(
        "absolute md:relative h-screen z-40 bg-white/60 backdrop-blur-xl dark:bg-black/20 md:border-r border-gray-100 dark:border-white/10 flex flex-col justify-between transition-all duration-500",
        open ? "w-full md:w-[280px]" : "w-0 md:w-20"
      )}
    >
      {/* TOGGLE */}
      <Button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "absolute top-4 z-50 p-2 rounded-xl bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 transition-all duration-500",
          open ? "right-2" : "-right-12"
        )}
      >
        <Menu size={22} />
      </Button>

      {/* USER */}
      <div
        className={cn(
          "p-4 flex items-center justify-center h-20 overflow-hidden",
          !open && "px-0 md:px-4"
        )}
      >
        <div className="px-4 py-2 rounded-xl bg-white/20 dark:bg-white/10 shadow">
          <p className="text-gray-600 text-sm">{me?.name || "N/A"}</p>
        </div>
      </div>

      {/* MENU */}
      <div
        className={cn(
          "flex flex-col px-4 gap-3 overflow-hidden",
          !open && "px-0 md:px-4"
        )}
      >
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 text-gray-400 transition",
            isLocation(["/"]) && "bg-blue-400 text-white hover:bg-blue-400/80"
          )}
        >
          <MessageSquare size={20} />
          {open && <span className="text-sm font-medium">Чаты</span>}
        </Button>

        <Button
          onClick={() => navigate("/task")}
          variant="outline"
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 text-gray-400 transition",
            isLocation(["/task"]) &&
              "bg-blue-400 text-white hover:bg-blue-400/80"
          )}
        >
          <ListChecks size={20} />
          {open && <span className="text-sm font-medium">Задачи</span>}
        </Button>
      </div>

      {/* BOTTOM */}
      <div
        className={cn(
          "flex flex-col p-4 gap-3 overflow-hidden",
          !open && "px-0 md:px-4"
        )}
      >
        <Button
          variant="outline"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 text-gray-400 transition"
          onClick={() => navigate("/subscriptions")}
        >
          <CreditCard size={20} />
          {open && <span className="text-sm font-medium">подписаться</span>}
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 text-gray-400 transition"
          onClick={() => navigate("/profile")}
        >
          <User size={20} />
          {open && <span className="text-sm font-medium">Профиль</span>}
        </Button>

        <CreateGroupModal isText={open} />
        <ExitModel isText={open} />
      </div>
    </div>
  );
}
