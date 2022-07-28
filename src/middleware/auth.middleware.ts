import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      appConfig.jwtSecret,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
