import { model } from "mongoose";
import { IUser, userSchema } from "./user.model";

export const User = model<IUser>('User', userSchema);

