import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./login-animation.css";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import { useState } from "react";
import { login } from "@/api/service/auth/auth-servce";
import { toast } from "sonner";

export function LoginPage() {
  const navigator = useNavigate();
  const [isEye, setIsEye] = useState(false);
  const formSchema = z.object({
    name: z.string().min(1, "Поле не должно быть пустым"),
    password: z.string().min(6, "Минимум 6 символов"),
  });

  type LoginFormValues = z.infer<typeof formSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data)
      .then((res) => [
        localStorage.setItem("accessToken", res.accessToken),
        localStorage.setItem("refreshToken", res.refreshToken),
        navigator("/"),
      ])
      .catch((err) => {
        if (err.status === 404 || err.status === 400) {
          toast.error("вы не авторизованы!", { richColors: true });
        }
      });

    form.reset();
  };

  return (
    <div className="w-full h-screen flex items-center bg-white dark:bg-neutral-950">
      {/* LEFT SIDE */}
      <div className="relative overflow-hidden flex w-full lg:w-1/2 h-full items-center justify-center">
        <div className="absolute top-1/2 -translate-y-1/2 justify-center items-center px-10 hidden lg:flex">
          <Fade
            delay={1200}
            className="bg-(--surface) backdrop-blur-xs px-6 py-4 rounded-2xl text-lg font-semibold text-white drop-shadow-xl max-w-lg text-center shadow-[0_0_20px_rgba(0,0,0,0.25)]"
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
          src="minecraft.jpeg"
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
                  Вход
                </h2>
                <p className="text-gray-300 lg:text-gray-500 text-sm mt-1">
                  Введите ваши данные, чтобы продолжить
                </p>
              </div>
            </Slide>
          </Fade>

          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Fade delay={400}>
                      <Slide direction="up" delay={600} triggerOnce>
                        <FormItem className="space-y-0.5">
                          <FormLabel className="text-gray-200 lg:text-black">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              className="h-11 text-gray-200 lg:text-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </Slide>
                    </Fade>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Fade delay={400}>
                      <Slide direction="up" delay={600} triggerOnce>
                        <FormItem className="space-y-0.5">
                          <FormLabel className="text-gray-200 lg:text-black">
                            Пароль
                          </FormLabel>
                          <FormControl>
                            <span className="flex items-stretch">
                              <Input
                                type={isEye ? "string" : "password"}
                                placeholder="Введите пароль"
                                className="h-11 text-gray-200 lg:text-black"
                                {...field}
                              />
                              <Button
                                variant="outline"
                                type="button"
                                className="h-full"
                                onClick={() => setIsEye(!isEye)}
                              >
                                <Eye />
                              </Button>
                            </span>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </Slide>
                    </Fade>
                  )}
                />

                <Fade delay={500} triggerOnce>
                  <Slide direction="up" delay={700} triggerOnce>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full h-11 text-base font-medium mt-5 mb-2 bg-transparent text-gray-200 lg:text-black"
                    >
                      Войти
                    </Button>
                  </Slide>
                </Fade>
              </form>
            </Form>
          </div>

          <Fade delay={500} triggerOnce>
            <Slide direction="up" delay={700} triggerOnce>
              <span>
                <p className="text-sm text-center text-gray-200 lg:text-gray-600 dark:text-gray-40 ">
                  Нет аккаунта?{" "}
                  <span
                    className="hover:underline cursor-pointer text-gray-200 lg:text-black"
                    onClick={() => navigator("/register")}
                  >
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
