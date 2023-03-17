import { Response } from "express";
import { messageGeneral } from "../utils/message.util";

export const InternalServerError = (res: Response, err?: any) => {
  if (err) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(500).json({ message: messageGeneral.SOMETHING_WRONG });
};

export const BadRequest = (res: Response, message: string) => {
  return res.status(400).json({ message: message });
};

export const OK = (res: Response, data: any) => {
  return res.status(200).json(data);
};

export const Created = (res: Response, data: any) => {
  return res.status(201).json(data);
};