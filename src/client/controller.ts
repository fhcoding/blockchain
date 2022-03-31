import { Request, Router } from "express";
import { Authenticate } from "../middleware/authentication";
import { Client } from "./entity";

export const clientController = Router();

clientController.use((req, res, next) => {
  next();
});

clientController.get("/", Authenticate, async (req, res) => {
  res.json(Client.clients);
});

clientController.get("/me", Authenticate, async (req: any | Request, res) => {
  res.json(req.user);
});

clientController.post("/join", async (req, res) => {
  const client = await new Client();
  res.json({ identity: client.identity });
});
