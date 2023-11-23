import { Request } from "express";
import { UserType } from "../model/userModel";

export interface ExtendedRequest extends Request {
  user?: UserType;
}
