import { env } from "../config/env";

const url = env.baseUrl;

export const urls = {
  auth: {
    refresh: url + "auth/refresh",
  },
};
