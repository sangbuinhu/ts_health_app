import { Request, Response, NextFunction } from "express";
import { BadRequest } from "./response.middleware";

export const validateRequest = (schema: any) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    });
    return next();
  } catch (err: any) {
    return BadRequest(res, err.message);
  }
};