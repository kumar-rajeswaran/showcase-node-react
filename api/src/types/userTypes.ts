import { Users } from "../entities";

export interface IUserSignup {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export type IUserResponse = Partial<Pick<Users, "id" | "email" | "firstName" | "lastName" | "createdOn">>;
