import { Response } from "express";
import { Created, InternalServerError } from "../middlewares/response.middleware";
import { User } from "../models";
import { UserRegisterRequest } from "../requests/user.request";

const register = async (req: UserRegisterRequest, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();

    user.password = undefined;
    user.salt = undefined;

    return Created(res, user);
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error);
  }
};


export default {
  register
};
