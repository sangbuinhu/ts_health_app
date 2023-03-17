import { Response } from "express";
import { BadRequest, Created, InternalServerError, NotFound, OK } from "../middlewares/response.middleware";
import { User } from "../models";
import { UserLoginRequest, UserRegisterRequest } from "../requests/user.request";
import { messageGeneral } from "../utils/message.util";
import { jwtEncode } from "../utils/jwt.util";
import { JWT_SECRET_KEY } from "../configs/constants";

const register = async (req: UserRegisterRequest, res: Response) => {
  try {
    /* Check user existed */
    const userGet = await User.findOne({ email: req.body.email });
    if (userGet) {
      return BadRequest(res, messageGeneral.EMAIL_EXISTED);
    }

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

const login = async (req: UserLoginRequest, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email salt password");

    if (!user || !user.validPassword(req.body.password)) {
      return BadRequest(res, messageGeneral.PASSWORD_WRONG);
    }

    const data = {
      role: "user",
      email: user.email
    };
    /* Generate JWT token */
    const jwtToken = jwtEncode(data, JWT_SECRET_KEY);

    const response = {
      token: jwtToken
    };
    return OK(res, response);
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error);
  }
};


export default {
  register,
  login
};
