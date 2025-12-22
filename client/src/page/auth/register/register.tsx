import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router";

export function RegisterPage() {
  const navigator = useNavigate();

  return (
    <div className="w-full h-screen flex items-center bg-white dark:bg-neutral-950">
      {/* LEFT SIDE */}
      <div className="relative overflow-hidden flex w-full lg:w-1/2 h-full items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2 px-10 hidden lg:flex">
          <Fade
            delay={1200}
            className="bg-(--surface) backdrop-blur-xs px-6 py-4 rounded-2xl text-lg font-semibold text-white drop-shadow-xl max-w-lg text-center shadow-[0_0_20px_rgba(0,0,0,0.25)]"
          >
            <span>
              <p className="text-xl pb-5">Добро пожаловать 👋</p>
              <p className="text-sm font-normal">
                Создай аккаунт и начни работать в удобной среде для общения,
                командной работы и управления задачами. Всё просто и под рукой.
              </p>
            </span>
          </Fade>
        </div>

        <img
          src="minecraft-2.jpeg"
          className="w-full h-full object-cover banner-login"
          alt="img"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute lg:relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:bg-white h-full backdrop-blur-sm">
        <div className="w-full max-w-sm space-y-7 bg-black/50 lg:bg-transparent p-10 rounded-lg">
          <Fade delay={200}>
            <Slide direction="up" delay={400} triggerOnce>
              <div>
                <h2 className="text-3xl font-semibold text-gray-200 lg:text-gray-900">
                  Регистрация
                </h2>
                <p className="text-gray-300 lg:text-gray-500 text-sm mt-1">
                  Заполните данные, чтобы создать аккаунт
                </p>
              </div>
            </Slide>
          </Fade>

          <div className="space-y-4">
            {/* Name */}
            <Fade delay={300}>
              <Slide direction="up" delay={500} triggerOnce>
                <div className="space-y-1">
                  <Label className="text-gray-200 lg:text-black">Имя</Label>
                  <Input
                    placeholder="Ваше имя"
                    className="h-11 text-gray-200 lg:text-black"
                  />
                </div>
              </Slide>
            </Fade>

            {/* Email */}
            <Fade delay={400}>
              <Slide direction="up" delay={600} triggerOnce>
                <div className="space-y-1">
                  <Label className="text-gray-200 lg:text-black">Email</Label>
                  <Input
                    placeholder="you@example.com"
                    className="h-11 text-gray-200 lg:text-black"
                  />
                </div>
              </Slide>
            </Fade>

            {/* Password */}
            <Fade delay={500}>
              <Slide direction="up" delay={700} triggerOnce>
                <div className="space-y-1">
                  <Label className="text-gray-200 lg:text-black">Пароль</Label>
                  <Input
                    type="password"
                    placeholder="Придумайте пароль"
                    className="h-11 text-gray-200 lg:text-black"
                  />
                </div>
              </Slide>
            </Fade>
          </div>

          {/* Actions */}
          <Fade delay={600}>
            <Slide direction="up" delay={800} triggerOnce>
              <span className="space-y-3 block">
                <Button
                  variant="outline"
                  className="w-full h-11 text-base font-medium bg-transparent text-gray-200 lg:text-black"
                >
                  Создать аккаунт
                </Button>

                <p className="text-sm text-center text-gray-200 lg:text-gray-600">
                  Уже есть аккаунт?{" "}
                  <span
                    className="hover:underline cursor-pointer text-gray-200 lg:text-black"
                    onClick={() => navigator("/login")}
                  >
                    Войти
                  </span>
                </p>
              </span>
            </Slide>
          </Fade>
        </div>
      </div>
    </div>
  );
}
