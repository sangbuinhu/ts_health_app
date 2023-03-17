import { Router } from "express";
import userController from "../controllers/user.controller";
import { validateRequest } from "../middlewares/request.middleware";
import { userLoginSchema, userRegisterSchema } from "../requests/user.request";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(userRegisterSchema),
  userController.register
);

userRouter.post(
  "/login",
  validateRequest(userLoginSchema),
  userController.login
);