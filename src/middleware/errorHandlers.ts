import { Request, Response } from "express";

export function NotFoundHandler(req: Request, res: Response, next: () => any) {
  res.status(404);

  res.format({
    json: function () {
      res.json({ error: "Not found" });
    },
    default: function () {
      res.type("txt").send("Not found");
    },
  });
}

export function ServerErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: () => any
) {
  res.status(500);
  res.json({ message: err.message, stack: err.stack });
}

export function BodyValidator(
  validator: (body: any) => boolean,
  message = "Unprocessable content"
) {
  return (req: Request, res: Response, next: () => any) => {
    const valid = validator(req.body);
    if (!valid) return res.status(422).json({ status: 422, message: message });
    next();
  };
}
