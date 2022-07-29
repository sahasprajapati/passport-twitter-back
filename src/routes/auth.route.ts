import { Router } from "express";
import passport from "passport";
import { Response } from "../common/dtos/response.dto";
import { appConfig } from "../config/app.config";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

export const authRouter = Router();

// Login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");

    const response = await AuthController.login({ username, password });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

// Register new user
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, repassword } = req.body;
    if (!username) throw new Error("Username cannot be empty");
    if (!password) throw new Error("Password cannot be empty");
    if (!repassword) throw new Error("Repassword cannot be empty");
    if (password !== repassword) throw new Error("Password's must match");

    const response = await AuthController.register({ username, password });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

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
  res.send(new Response());
  // res.redirect(appConfig.clinetUrl);
});

// redirect to home page after successfully login via twitter
authRouter.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    // successRedirect: appConfig.clinetUrl ,
    failureRedirect: "/auth/login/failed",
  }),
  async (req, res, next) => {
    const user: any = req.user;
    const exist = await AuthService.checkUser(user.username);
    if (exist) {
      const { token } = await AuthService.passwordlessLogin(user.username);
      res.redirect(`${appConfig.clinetUrl}/login?token=${token}`);
    } else
      res.redirect(`${appConfig.clinetUrl}/sign-up?username=${user.username}`);
  }
);
