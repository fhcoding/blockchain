import express from "express";
import { Express } from "express";
import { clientController } from "./client/controller";
import {
  NotFoundHandler,
  ServerErrorHandler,
} from "./middleware/errorHandlers";
import { Logger } from "./middleware/logger";
import { transactionController } from "./transaction/controller";

const PORT = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(Logger);

app.use("/client", clientController);
app.use("/transaction", transactionController);
app.use(NotFoundHandler);
app.use(ServerErrorHandler);
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
