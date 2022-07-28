import { config } from "dotenv";

config();

export const appConfig = {
  clinetUrl: process.env.CLIENT_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  mongoURI: process.env.MONGODB_URI || "",
  cookieKey: process.env.COOKIE_KEY || "",
  port: parseInt(process.env.PORT as string) || 4000,
};
