import { upload } from "@/api/service/upload/upload";
import { toast } from "sonner";

export function FileUrl(file: File, form: any, name: string) {
  let imageUrl = "";

  upload(file)
    .then((res: any) => {
      imageUrl = res.url;
      form.setValue(name, res.url);
    })
    .catch((err) => {
      if (
        err.response?.data.message ===
        "Validation failed (expected size is less than 5000000)"
      ) {
        toast.error("Файл слишком большой", { richColors: true });
      } else {
        toast.error("ошибка!", { richColors: true });
      }
    });

  return imageUrl;
}
