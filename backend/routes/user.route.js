import express from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { home, profile, addFavFruit } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.get("/home", home);
userRouter.post("/profile", [verifyJwt], profile);
userRouter.post("/addfavfruit", [verifyJwt], addFavFruit);
