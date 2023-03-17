import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../configs/constants";
import { jwtDecode } from "../utils/jwt.util";
import { User } from "../models";
import { Unauthorized } from "./response.middleware";

export const userTokenRequired = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return Unauthorized(res);
  }
  const jwtToken = bearer.split(" ")[1];
  const dataDecoded = await jwtDecode(jwtToken, JWT_SECRET_KEY);
  if (!dataDecoded || dataDecoded.role !== "user") {
    return Unauthorized(res);
  }

  const userGet = await User.findOne({ email: dataDecoded.email });
  if (!userGet) {
    return Unauthorized(res);
  }

  req.user = userGet;
  next();
};