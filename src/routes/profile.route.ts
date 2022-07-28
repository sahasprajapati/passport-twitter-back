import { Console } from "console";
import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { IUser } from "../types/user";

export const profileRouter = Router();

// User Profile
profileRouter.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    const user: IUser = req.user as IUser;
    console.log(user);
    if (!user || !user.id) throw new Error("User not found");
    const response = await ProfileController.profile(user.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
