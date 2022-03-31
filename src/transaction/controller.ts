import { Router } from "express";
import { Client } from "../client/entity";
import { Authenticate } from "../middleware/authentication";
import { BodyValidator } from "../middleware/errorHandlers";
import { transactionRequestValidator } from "../middleware/validators";
import { Transaction } from "./entity";

export const transactionController = Router();

transactionController.use(Authenticate);

transactionController.get("/", (req, res) => {
  res.json(Transaction.transactions);
});

transactionController.post(
  "/send",
  BodyValidator(transactionRequestValidator),
  async (req: any, res) => {
    let { sender, recipient, value } = req.body;
    sender = sender ? Client.find(sender) : req.user;
    if (!sender || !Client.find(recipient)) {
      return res
        .status(404)
        .json({ error: sender ? "Recipient not exists" : "Sender not exists" });
    }

    const transaction = await new Transaction(sender, recipient, value);
    res.json(transaction.data);
  }
);
