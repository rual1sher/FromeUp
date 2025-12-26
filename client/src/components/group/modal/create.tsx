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
import { useGroupStore } from "@/store/group.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateGroupModal({ isText }: { isText: boolean }) {
  const [open, setOpen] = useState(false);
  const { createGroup } = useGroupStore();
  function handleRemoveUrl(name: "image" | "banner") {
    form.setValue(name, "");
  }

  function handleAddUrl(
    e: ChangeEvent<HTMLInputElement>,
    name: "image" | "banner"
  ) {
    if (e.target.files && e.target.files.length > 0) {
      FileUrl(e.target.files[0], form, name);
    }
  }

  const formSchema = z.object({
    nickname: z.string().min(5, "Минимум 5 символов"),
    name: z.string().min(1, "Поле не должно быть пустым"),
    desc: z.string(),
    image: z.string(),
    banner: z.string(),
    members: z.array(z.number()),
  });

  type CreateFormValue = z.infer<typeof formSchema>;

  const form = useForm<CreateFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      name: "",
      desc: "",
      image: "",
      banner: "",
      members: [],
    },
  });

  const onSubmit = (data: CreateFormValue) => {
    createGroup(data)
      .then(() => {
        form.reset();
        setOpen(false);
        toast.success("Группа успешно создана!");
      })
      .catch((err) => {
        if (err.response?.data.message === "nickname exists") {
          toast.error("Группа с таким названием уже существует!", {
            richColors: true,
          });
        } else {
          toast.error("ошибка!", { richColors: true });
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 overflow-hidden rounded-xl hover:bg-white/20 text-gray-400 transition"
        >
          <Plus size={20} />
          {isText && <p className="text-sm">Создать группу</p>}
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
                    src={form.watch("banner")}
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
                {form.watch("image") ? (
                  <>
                    <img
                      src={form.watch("image")}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl("image")}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-full"
                    >
                      <Trash className="text-red-400" size={22} />
                    </button>
                  </>
                ) : (
                  <>
                    <Input
                      type="file"
                      onChange={(e) => handleAddUrl(e, "image")}
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
              delay={400}
            />

            <FormItemInput
              form={form}
              label="Название"
              name="name"
              placeholder="Введите название"
              delay={500}
            />

            <FormItemInput
              form={form}
              label="Описание"
              name="desc"
              placeholder="Введите описание"
              delay={600}
            />

            <Fade triggerOnce delay={700}>
              <Slide triggerOnce direction="up" delay={700}>
                <Button
                  variant="default"
                  type="submit"
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2 shadow-md transition-colors"
                >
                  Создать
                </Button>
              </Slide>
            </Fade>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
