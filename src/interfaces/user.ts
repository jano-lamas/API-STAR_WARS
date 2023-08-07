import { IAuth } from "./auth";

export interface IUser extends IAuth {
  name: string;
  lastName: string;
  type: string[];
}
