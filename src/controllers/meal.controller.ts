import { Request, Response } from "express";
import { AWS_S3_BUCKET_MEAL, S3_URL } from "../configs/constants";
import { S3Manager } from "../extenal.services/s3.client";
import { Created, InternalServerError, OK } from "../middlewares/response.middleware";
import { Meal } from "../models";
import { MealCreateRequest } from "../requests/meal.request";

const create = async (req: MealCreateRequest, res: Response) => {
  try {
    const meal = new Meal(req.body);

    /* Upload image to S3 */
    const imageBuffer = req.fileBuffer;
    const s3 = new S3Manager();
    const fileName = 'meal_' + Date.now() + '.jpg';
    const s3Uploaded = await s3.uploadImage(
      AWS_S3_BUCKET_MEAL,
      fileName,
      imageBuffer
    );
    if (!s3Uploaded) {
      return InternalServerError(res);
    }
    meal.user = req.user.id;
    meal.image_url = S3_URL + AWS_S3_BUCKET_MEAL + '/' + fileName;
    await meal.save();

    return Created(res, meal);
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error);
  }
};

const getAll = async (_: Request, res: Response) => {
  try {
    const meals = await Meal.find().sort("-date session");
    return OK(res, {
      Meals: meals
    });
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error);
  }
};

export default {
  create,
  getAll
};