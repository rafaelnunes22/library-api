import "dotenv/config";
import express from "express";
import cors from "cors";

import { router } from "./routes";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

