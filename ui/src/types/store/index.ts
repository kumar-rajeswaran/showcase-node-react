import { IAuthReducer, IUserReducer } from "../reducers";

export interface IStore {
  users: IUserReducer;
  auth: IAuthReducer;
}