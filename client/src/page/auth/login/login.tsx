import { Button } from "@/components/ui/button";
import "./login-animation.css";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/api/service/auth/auth-servce";
import { toast } from "sonner";
import { FormItemInput } from "@/common/form/form-item";

export default function LoginPage() {
  const navigator = useNavigate();
  const formSchema = z.object({
    nickname: z.string().min(4, "Минимум 4 символов"),
    password: z.string().min(6, "Минимум 6 символов"),
  });

  type LoginFormValues = z.infer<typeof formSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", nickname: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data)
      .then((res) => [
        localStorage.setItem("accessToken", res.accessToken),
        localStorage.setItem("refreshToken", res.refreshToken),
        form.reset(),
        navigator("/"),
      ])
      .catch((err) => {
        if (err.status === 404 || err.status === 400) {
          return toast.error("вы не авторизованы!", { richColors: true });
        }
        toast.error("ошибка!", { richColors: true });
      });
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
            <Slide direction="up" delay={200} triggerOnce>
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
                className="grid gap-4"
              >
                <FormItemInput
                  form={form}
                  label="Никнейм"
                  name="nickname"
                  placeholder="Введите никнейм"
                  delay={300}
                  labelColor="rgb(200,200,200)"
                />

                <FormItemInput
                  form={form}
                  label="Пароль"
                  name="password"
                  placeholder="Введите пароль"
                  delay={500}
                  labelColor="rgb(200,200,200)"
                />

                <Fade delay={600} triggerOnce>
                  <Slide direction="up" delay={600} triggerOnce>
                    <span>
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full h-11 text-base font-medium mt-5 mb-2 bg-transparent text-gray-200 lg:text-black"
                      >
                        Войти
                      </Button>

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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
