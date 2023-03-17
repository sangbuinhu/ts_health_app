import { IUser } from "../models/user.model";

export { };

declare global {
  namespace Express {
    export interface Request {
      user: model<IUser>;
      fileBuffer: Buffer;
    }
  }
}