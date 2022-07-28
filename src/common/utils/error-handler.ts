import { Request, Response, NextFunction } from "express";

function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.type == "redirect") res.redirect("/error");
  else if (err.type == "time-out")
    res.status(408).send({
      success: false,
      message: err.message,
    });
  else
    res.status(400).send({
      success: false,
      message: err.message,
    });
}

export default handleError;
