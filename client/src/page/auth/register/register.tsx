import { register } from "@/api/service/auth/auth-servce";
import { FormItemInput } from "@/common/form/form-item";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fade, Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
  const navigator = useNavigate();

  const formSchema = z.object({
    name: z.string().min(4, "Минимум 4 символов"),
    password: z.string().min(6, "Минимум 6 символов"),
  });

  type RegisterFormValue = z.infer<typeof formSchema>;

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });

  const onSubmit = (data: RegisterFormValue) => {
    register(data)
      .then((res) => [
        localStorage.setItem("accessToken", res.accessToken),
        localStorage.setItem("refreshToken", res.refreshToken),
        form.reset(),
        navigator("/"),
      ])
      .catch((err) => {
        form.reset();
        if (err.response.data.message === "user exists") {
          return toast.error("Имя пользователя уже существует!", {
            richColors: true,
          });
        }
        toast.error("ошибка!", { richColors: true });
      });
  };

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
            <Slide direction="up" delay={200} triggerOnce>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormItemInput
                form={form}
                label="Логин"
                name="name"
                placeholder="Введите логин"
                delay={300}
                labelColor="rgb(200,200,200)"
              />

              <FormItemInput
                form={form}
                label="Пароль"
                name="password"
                placeholder="Введите пароль"
                delay={400}
                labelColor="rgb(200,200,200)"
              />

              <Fade delay={500}>
                <Slide direction="up" delay={500} triggerOnce>
                  <span className="space-y-3 block">
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full h-11 text-base font-medium mt-5 bg-transparent text-gray-200 lg:text-black"
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
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
