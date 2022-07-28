import { Router } from "express";
import handleError from "../common/utils/error-handler";

export const errorRouter = Router();

errorRouter.get("*", (req, res) => {
  res.send("Page not found");
});

errorRouter.get("/error", (req, res) => {
  res.send("Page not found");
});
