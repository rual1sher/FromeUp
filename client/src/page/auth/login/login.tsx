import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./login-animation.css";
import { Fade, Slide } from "react-awesome-reveal";
import animechan from "/Без названия (1).jpeg";

export function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center bg-white dark:bg-neutral-950">
      {/* LEFT SIDE */}
      <div className="relative overflow-hidden flex w-full md:w-1/2 h-full items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2 justify-center items-center px-10 hidden md:flex">
          <Fade
            delay={1200}
            className="bg-[var(--surface)] backdrop-blur-xs px-6 py-4 rounded-2xl text-md font-semibold text-white drop-shadow-xl max-w-md text-center shadow-[0_0_20px_rgba(0,0,0,0.25)]"
          >
            <span>
              <p className="text-xl pb-5">Рады видеть тебя снова!</p>
              <p className="text-sm font-normal">
                Твоя организация — это пространство для работы и общения: общий
                чат для команды, отдельные чаты по задачам, управление
                участниками и удобная система распределения работы. Всё, что
                нужно для продуктивного дня, собрано здесь.
              </p>
            </span>
          </Fade>
        </div>

        <img
          src={animechan}
          className="w-full h-full object-cover banner-login"
          alt="img"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute md:relative w-full md:w-1/2 flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm">
        <div className="w-full max-w-sm space-y-7">
          <Fade delay={200}>
            <Slide direction="up" delay={400} triggerOnce>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Вход
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Введите ваши данные, чтобы продолжить
                </p>
              </div>
            </Slide>
          </Fade>
          <div className="space-y-4">
            <Fade delay={300}>
              <Slide direction="up" delay={500} triggerOnce>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input placeholder="you@example.com" className="h-11" />
                </div>
              </Slide>
            </Fade>

            <Fade delay={400}>
              <Slide direction="up" delay={600} triggerOnce>
                <div className="space-y-1">
                  <Label>Пароль</Label>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    className="h-11"
                  />
                </div>
              </Slide>
            </Fade>
          </div>

          <Fade delay={500} triggerOnce>
            <Slide direction="up" delay={700} triggerOnce>
              <span>
                <Button className="w-full h-11 text-base font-medium mb-2">
                  Войти
                </Button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-40 ">
                  Нет аккаунта?{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Создать
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
