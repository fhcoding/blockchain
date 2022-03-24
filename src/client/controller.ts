import { Router } from "express";
import { Client } from "./entity";

export const clientController = Router();

clientController.use((req, res, next) => {
  next();
});

clientController.post("/join", (req, res) => {
  const client = new Client();
  res.json({ identity: client.identity });
});
