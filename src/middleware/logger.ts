import { Request, Response } from "express";

export function Logger(req: Request, res: Response, next: () => any) {
  console.log(
    `${req.method} - ${req.path}: ${new Date().toUTCString()} [] ${
      res.statusCode
    }`
  );
  next();
}
