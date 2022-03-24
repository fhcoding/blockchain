import express from "express";
import { Express } from "express";
import { clientController } from "./client/controller";
import { NotFoundHandler } from "./middleware/errorHandlers";

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use("/client", clientController);
app.use(NotFoundHandler);
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
