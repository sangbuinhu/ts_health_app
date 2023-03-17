import crypto from "crypto";
import { Schema, Types } from "mongoose";
import modelOptions from "./model.options";

export interface IUser {
  id: Types.ObjectId;
  name: string;
  gender?: string;
  birthday?: Date;
  email: string;
  salt?: string;
  password?: string;
  created: Date;
  updated: Date;
  hashPassword: Function;
  validPassword: Function;
}

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  birthday: {
    type: Date
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    select: false
  },
  password: {
    type: String,
    required: true,
    select: false
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


userSchema.pre('save', function (next) {
  this.salt = crypto.randomBytes(16).toString('base64');
  this.password = this.hashPassword(this.password);
  next();
});

userSchema.methods.hashPassword = function (password: string) {
  return crypto.pbkdf2Sync(
    password,
    this.salt,
    10000,
    64,
    "sha512"
  ).toString("base64");
};


userSchema.methods.validPassword = function (password: string) {
  return this.password === this.hashPassword(password);
};