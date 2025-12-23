import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/types/type";
import { Fade, Slide } from "react-awesome-reveal";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";

interface Props {
  user?: User | null;
  onEdit: () => void;
}

export function ProfileComponent({ user, onEdit }: Props) {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* BANNER */}
      <div className="relative h-40 md:h-[280px] overflow-hidden">
        <img
          src={user?.banner || "c32c404960043d13665ec11fbd584c5f.jpg"}
          className="w-full h-full object-cover"
          alt="banner"
        />
      </div>

      {/* CONTENT */}
      <div className="relative max-w-5xl mx-auto">
        <div className="p-5 bg-white/50 backdrop-blur-lg -mt-8 md:-mt-12 rounded-md">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row gap-6 ">
            {/* AVATAR */}
            <Slide direction="up" delay={200} triggerOnce>
              <Fade delay={200} triggerOnce>
                <div className="relative shrink-0 mx-auto md:mx-0">
                  <Avatar className="w-30 h-30 md:w-36 md:h-36 border-4 border-background mx-auto shadow-xl">
                    <AvatarImage src={user?.avatar ?? undefined} />
                    <AvatarFallback className="text-xl md:text-3xl">
                      {user?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* STATUS */}
                  <Badge
                    variant="secondary"
                    className={cn(
                      "mt-5 w-full",
                      user?.status
                        ? "bg-green-500/20 text-green-600"
                        : "bg-red-500/10 text-red-600"
                    )}
                  >
                    {user?.status ? "Онлайн" : "Оффлайн"}
                  </Badge>
                </div>
              </Fade>
            </Slide>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <Fade delay={400} cascade damping={0.3} triggerOnce>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    {user?.name}
                  </h1>
                </div>

                {/* BIO */}
                {user?.desc ? (
                  <p className="text-sm text-gray-700 max-w-2xl">{user.desc}</p>
                ) : (
                  <p className="text-sm text-gray-700 max-w-2xl">био ничего</p>
                )}

                {/* META */}
                <div className="text-xs text-muted-foreground">
                  Аккаунт создан:{" "}
                  {user?.createdAt &&
                    new Date(user.createdAt).toLocaleDateString()}
                </div>
              </Fade>
            </div>
          </div>

          <Separator className="my-8" />
        </div>
      </div>
    </div>
  );
}
