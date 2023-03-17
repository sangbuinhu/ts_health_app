import { ObjectId } from "bson";
import { Schema, Types } from "mongoose";
import modelOptions from "./model.options";
import { IUser } from "./user.model";

export interface IMeal {
  id: Types.ObjectId;
  date: Date;
  user: IUser;
  session: number;
  name?: string;
  image_url: string;
  memo?: string;
  created: Date;
  updated: Date;
}

export const mealSchema = new Schema<IMeal>({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  session: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  memo: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
}, modelOptions);