import { Router } from "express";
import passport from "passport";
import { send } from "process";
import { appConfig } from "../config/app.config";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
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

// Login twitter
authRouter.get("/login/twitter", async (req, res, next) => {
  try {
    passport.authenticate("twitter");
  } catch (err) {
    next(err);
  }
});

// Login twitter
authRouter.get(
  "/callback/twitter",
  passport.authenticate("twitter", {
    successRedirect: `{appConfig.clinetUrl}/sign-up`,
    failureRedirect: "/login",
    failureMessage: true,
  }),
  async (req, res, next) => {
    try {
      console.log("wow");
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
);

// when login is successful, retrieve user info
authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});
// auth with twitter
authRouter.get("/twitter", passport.authenticate("twitter"));
// when login failed, send failed msg
authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});
// When logout, redirect to client
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    //
  });
  res.redirect(appConfig.clinetUrl);
});

// redirect to home page after successfully login via twitter
authRouter.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    // successRedirect: appConfig.clinetUrl ,
    failureRedirect: "/auth/login/failed",
  }),
  async (req, res, next) => {
    console.log("whasd");
    console.log(req.user);
    const user: any = req.user;
    const exist = await AuthService.checkUser(user.username);
    if (exist) {
      const { token } = await AuthService.passwordlessLogin(user.username);
      res.redirect(`${appConfig.clinetUrl}/login?token=${token}`);
    } else
      res.redirect(`${appConfig.clinetUrl}/sign-up?email=${user.username}`);
  }
);
