import { Response } from "express";
import { messageGeneral, messageToken } from "../utils/message.util";

export const InternalServerError = (res: Response, error?: any) => {
  if (error) {
    return res.status(500).json({ message: error.message });
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

export const NotFound = (res: Response, name: string) => {
  return res.status(404).json({ message: `${name} not found` });
};

/* Validate */
export const Unauthorized = (res: Response) => {
  return res.status(401).json({ message: messageToken.TOKEN_INVALID });
};