import { Router } from "express";
import mealController from "../controllers/meal.controller";
import { userTokenRequired } from "../middlewares/auth.middleware";
import { multipartMiddleware } from "../middlewares/multipart.middleware";
import { validateRequest } from "../middlewares/request.middleware";
import { mealCreateSchema } from "../requests/meal.request";

export const mealRouter = Router();

mealRouter.post(
  "/",
  userTokenRequired,
  validateRequest(mealCreateSchema),
  multipartMiddleware,
  mealController.create
);

mealRouter.get(
  "/",
  userTokenRequired,
  mealController.getAll
);
