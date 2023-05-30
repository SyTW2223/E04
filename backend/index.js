import express from "express";
import { authRouter } from "./routes/auth.route.js";
import "./config/db.js"

const app = express();
app.use(express.json());
app.use(authRouter);

const port = 8080;
app.listen(port, () => {
  console.log("Server on port " + port);
});
