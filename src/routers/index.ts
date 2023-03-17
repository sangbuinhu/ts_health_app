import { Router } from "express";
import { mealRouter } from "./meal.router";
import { userRouter } from "./user.route";

export const router = Router();

router.use("/users", userRouter);
router.use("/meals", mealRouter);