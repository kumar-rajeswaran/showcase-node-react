import { createSlice } from "@reduxjs/toolkit";
import {
  IActionWithOutPayload,
  IActionWithPayload,
  IAuthReducer,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
} from "../../types";

const initialState: IAuthReducer = {
  user: {},
  isFetching: false,
  isLoggedIn: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doLogin: (state: IAuthReducer, _action: IActionWithPayload<ISignInRequest>) => {
      state.isFetching = true;
      state.isLoggedIn = false;
    },
    setToken: (state: IAuthReducer, action: IActionWithPayload<string>) => {
      state.token = action.payload;
    },
    doValidateToken: (state: IAuthReducer, _action: IActionWithOutPayload) => {
      state.isFetching = true;
    },
    setSigInResponse: (state: IAuthReducer, action: IActionWithPayload<ISignInResponse>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedIn = true;
      }
      state.isFetching = false;
    },
    doLogout: (state: IAuthReducer, _action: IActionWithOutPayload) => {
      state.isFetching = true;
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      state.isFetching = false;
    },
    doSignUp: (state: IAuthReducer, _action: IActionWithPayload<ISignUpRequest>) => {
      state.isFetching;
    },
  },
});

export const { doLogin, doLogout, setSigInResponse, setToken, doValidateToken, doSignUp } = authSlice.actions;
