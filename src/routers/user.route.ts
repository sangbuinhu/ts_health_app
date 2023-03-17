import express from "express";
import { validateRequest } from "../middlewares/request.middleware";
import { userRegisterSchema } from "../requests/user.request";
import userController from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  validateRequest(userRegisterSchema),
  userController.register
);