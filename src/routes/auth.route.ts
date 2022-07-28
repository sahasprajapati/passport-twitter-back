import { Router } from "express";
import { send } from "process";
import { AuthController } from "../controllers/auth.controller";
import { IUser } from "../types/user";

export const authRouter = Router();

// Login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email cannot be empty");
    if (!password) throw new Error("Password cannot be empty");

    const response = await AuthController.login({ email, password });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

// Register new user
authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email cannot be empty");
    if (!password) throw new Error("Password cannot be empty");

    const response = await AuthController.register({ email, password });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

// User Profile
authRouter.get("/profile", async (req, res, next) => {
  try {
    const user: IUser = req.user as IUser;
    if (!user || !user.id) throw new Error("User not found");
    const response = await AuthController.profile(user.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
