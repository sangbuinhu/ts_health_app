import { InferType, date, number, object, string } from "yup";
import { messageMeal } from "../utils/message.util";
import express, { Request, request } from "express";

const SESSION_ENUM = [1, 2, 3, 4];

export const mealCreateSchema = object({
  body: object({
    date: date().required(messageMeal.DATE_REQUIRED),
    session: number().required(messageMeal.SESSION)
      .oneOf(SESSION_ENUM, messageMeal.SESSION_INVALID),
    name: string().trim(),
    memo: string().trim()
  })
});

export interface MealCreateRequest extends Request {
  body: {
    date: Date;
    session: number;
    name: string;
    memo: string;
  };
}

