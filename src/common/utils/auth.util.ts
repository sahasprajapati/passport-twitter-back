import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { appConfig } from "../../config/app.config";
export const tokenify = (id: string, username: string) => {
  return jwt.sign({ username, id }, appConfig.jwtSecret, {
    expiresIn: "1d",
  });
};
export const comparePassword = (
  password: string,
  encPassword: string
): boolean => {
  return bcrypt.compareSync(password, encPassword);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
