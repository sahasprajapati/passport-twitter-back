import { config } from "dotenv";

config();

export const appConfig = {
  jwtSecret: process.env.JWT_SECRET || "",
  mongoURI: process.env.MONGODB_URI || "",
  port: parseInt(process.env.PORT as string) || 4000,
};
