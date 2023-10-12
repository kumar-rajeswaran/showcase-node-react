import { ISignInResponse, IUser } from "types";

export interface IActionWithPayload<T> {
  type: string;
  payload: T;
}
export interface IActionWithOutPayload {
  type: string;
}

export interface IUserReducer {
  isFetching: boolean;
  user: IUser[];
}

export interface IAuthReducer {
  isFetching: boolean;
  isLoggedIn: boolean;
  user: ISignInResponse;
  token: string;
}
