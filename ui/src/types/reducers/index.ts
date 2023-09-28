import { ISignInResponse, IUser } from "types";

export interface IActionWithpayload<T> {
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
  isLoggedin: boolean;
  user: ISignInResponse;
  token: string;
}
