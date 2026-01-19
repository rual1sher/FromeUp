import { config } from 'dotenv';
config();

export const env = {
  port: process.env.PORT,
  whiteList: process.env.WHITE_LIST,
  apiUrl: process.env.API_URL,
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRE,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USERNAME,
    port: Number(process.env.EMAIL_PORT),
    password: process.env.EMAIL_PASSWORD,
  },
};
