export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  createdOn: Date;
  updatedOn: Date;
}

export type ISignUpRequest = Partial<Pick<IUser, "email" | "firstName" | "lastName" | "password">>;

export type ISignInResponse = Partial<Pick<IUser, "email" | "firstName" | "lastName" | "createdOn" | "id" | "isActive">>;

export interface ISignInRequest {
  email: string;
  password: string;
}
