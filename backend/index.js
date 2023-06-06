import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import "./config/db.js"

export const app = express();
app.use(express.json());
app.use(authRouter);
app.use(userRouter);

const port = 8080;
app.listen(port, () => {
    console.log("Server on port " + port);
});
