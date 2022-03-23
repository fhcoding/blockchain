import express from "express";
import { Express } from "express";

const PORT = process.env.PORT || 3000;
const app: Express = express();
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
