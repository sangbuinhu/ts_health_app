import { model } from "mongoose";
import { IUser, userSchema } from "./user.model";
import { IMeal, mealSchema } from "./meal.model";

export const User = model<IUser>('User', userSchema);
export const Meal = model<IMeal>('Meal', mealSchema);