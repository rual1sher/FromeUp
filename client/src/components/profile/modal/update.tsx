import { FormItemInput } from "@/common/form/form-item";
import { FileUrl } from "@/common/uploads/upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import type { User } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, Plus, Trash } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateProfileModal({
  defaultValues,
}: {
  defaultValues: User | null;
}) {
  const [open, setOpen] = useState(false);
  const { editUser } = useAuthStore();

  function handleRemoveUrl(name: "avatar" | "banner") {
    form.setValue(name, "");
  }

  function handleAddUrl(
    e: ChangeEvent<HTMLInputElement>,
    name: "avatar" | "banner"
  ) {
    if (e.target.files && e.target.files.length > 0) {
      FileUrl(e.target.files[0], form, name);
    }
  }

  const formSchema = z.object({
    name: z.string(),
    nickname: z.string(),
    avatar: z.optional(z.string().nullable()),
    banner: z.optional(z.string().nullable()),
    desc: z.optional(z.string()),
  });

  type CreateFormValue = z.infer<typeof formSchema>;

  const form = useForm<CreateFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
      banner: "",
      desc: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.setValue("name", defaultValues.name);
      form.setValue("nickname", defaultValues.nickname);
      form.setValue("avatar", defaultValues.avatar);
      form.setValue("banner", defaultValues.banner);
      form.setValue("desc", defaultValues.desc);
    }
  }, [open]);

  const onSubmit = (data: CreateFormValue) => {
    if (defaultValues) {
      editUser(data, defaultValues.id.toString())
        .then(() => {
          form.reset();
          setOpen(false);
          toast.success("Профиль успешно обновлен!");
        })
        .catch((err) => {
          if (err.response?.data.message === "nickname exists") {
            toast.error("Профиль с таким никнеймом уже существует!", {
              richColors: true,
            });
          } else {
            toast.error("ошибка!", { richColors: true });
          }
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 overflow-hidden rounded-xl bg-gray-500/20 hover:bg-gray-500/50 text-white hover:text-white transition-all"
        >
          <PencilIcon size={20} />
          <p className="text-sm hidden md:block">обновить профиль</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg">
        <DialogHeader>
          <Fade triggerOnce delay={100}>
            <Slide triggerOnce direction="up" delay={100}>
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Создать группу
              </DialogTitle>
            </Slide>
          </Fade>
        </DialogHeader>

        {/* banner */}
        <Fade triggerOnce delay={200}>
          <Slide triggerOnce direction="up" delay={200}>
            <div className="relative h-44 bg-muted group z-10">
              {form.watch("banner") ? (
                <>
                  <img
                    src={form.watch("banner") ?? undefined}
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveUrl("banner")}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm 
                     opacity-0 group-hover:opacity-100 
                     transition-all flex items-center justify-center"
                  >
                    <Trash className="text-red-400" size={26} />
                  </button>
                </>
              ) : (
                <>
                  <Input
                    type="file"
                    onChange={(e) => handleAddUrl(e, "banner")}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                    <Plus size={30} />
                    <span className="text-sm">Загрузить баннер</span>
                  </div>
                </>
              )}
            </div>
          </Slide>
        </Fade>

        {/* Avatar */}
        <Fade triggerOnce delay={300}>
          <Slide triggerOnce direction="up" delay={300}>
            <div className="flex justify-center -mt-10">
              <div className="group relative w-32 h-32 rounded-full overflow-hidden border-4 border-background bg-muted">
                {form.watch("avatar") ? (
                  <>
                    <img
                      src={form.watch("avatar") ?? undefined}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl("avatar")}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-full"
                    >
                      <Trash className="text-red-400" size={22} />
                    </button>
                  </>
                ) : (
                  <>
                    <Input
                      type="file"
                      onChange={(e) => handleAddUrl(e, "avatar")}
                      className="absolute inset-0 w-full z-20 h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Plus size={24} />
                      <span className="text-xs">Аватар</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Slide>
        </Fade>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 mt-4"
          >
            <FormItemInput
              form={form}
              label="Никнейм"
              name="nickname"
              placeholder="Введите никнейм"
              delay={500}
            />

            <FormItemInput
              form={form}
              label="Название"
              name="name"
              placeholder="Введите название"
              delay={600}
            />

            <FormItemInput
              form={form}
              label="Описание"
              name="desc"
              placeholder="Введите описание"
              delay={700}
            />

            <Fade triggerOnce delay={800}>
              <Slide triggerOnce direction="up" delay={800}>
                <Button
                  variant="default"
                  type="submit"
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2 shadow-md transition-colors"
                >
                  Обновить
                </Button>
              </Slide>
            </Fade>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
