import { Request, Response } from "express";
import { Client } from "../client/entity";

export function Authenticate(
  req: any | Request,
  res: Response,
  next: () => any
) {
  const { authorization } = req.headers;

  if (authorization) {
    const tokenParts = authorization?.split(" ");
    let token: string = "";
    if (tokenParts && tokenParts.length > 1) {
      token = tokenParts[1].trim();
      const client = Client.find(token);
      if (client) {
        req.user = client;
        return next();
      }
    }
  }

  return res.status(403).format({
    json: function () {
      res.json({ error: "Unauthorize action", status: 403 });
    },
    default: function () {
      res.type("txt").send("Unauthorize action");
    },
  });
}
