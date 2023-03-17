import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { BadRequest, InternalServerError } from "./response.middleware";
import { messageMeal } from "../utils/message.util";
import { File } from "multiparty";
import { IMAGE_EXTENTION_ACCEPTED, IMAGE_MAX_SIZE } from "../configs/constants";
import path from "path";

export const multipartMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as any;
    /* Check image */
    if (!files || !files.image) {
      return BadRequest(res, messageMeal.IMAGE_REQUIRED);
    }
    /* Check size */
    const image: File = files.image;
    if (image.size > IMAGE_MAX_SIZE) {
      return BadRequest(res, messageMeal.IMAGE_LARGE);
    }
    /* Check extension */
    const extension = path.extname(image.path).toLowerCase();
    console.log(extension);
    if (!IMAGE_EXTENTION_ACCEPTED.includes(extension)) {
      return BadRequest(res, messageMeal.IMAGE_ONLY);
    }
    /* Add buffer to req */
    const imageBuffer = fs.readFileSync(image.path);
    req.fileBuffer = imageBuffer;
    next();
  } catch (error) {
    console.log(error);
    return InternalServerError(res);
  }
};