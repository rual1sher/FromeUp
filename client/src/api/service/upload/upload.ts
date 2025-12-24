import { api } from "@/api/axios/interceptors";
import { urls } from "../urls";

export async function upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const data = await api.post(urls.upload, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
