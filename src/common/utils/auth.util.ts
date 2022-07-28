import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { appConfig } from "../../config/app.config";
export const tokenify = (id: string, email: string) => {
  return jwt.sign({ email, id }, appConfig.jwtSecret);
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
