
import { InferType, date, object, ref, string } from "yup";
import { messageGeneral } from "../utils/message.util";

const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,})/;

export const userRegisterSchema = object({
  body: object({
    name: string().trim()
      .required(messageGeneral.NAME_REQUIRED),
    email: string().trim()
      .required(messageGeneral.EMAIL_REQUIRED)
      .email(messageGeneral.EMAIL_INVALID),
    gender: string().trim()
      .oneOf(["male", "female", "undefined"], messageGeneral.GENDER_INVALID),
    birthday: date(),
    password: string().trim()
      .required(messageGeneral.PASSWORD_REQUIRED)
      .matches(PASSWORD_REGEX, { message: messageGeneral.PASSWORD_STRENGTH }),
    passwordConfirm: string().trim()
      .required(messageGeneral.PASSWORD_CONFIRM_REQUIRED)
      .oneOf([ref('password')], messageGeneral.PASSWORD_NOT_MATCH)
  })
});

export interface UserRegisterRequest extends InferType<typeof userRegisterSchema> { }