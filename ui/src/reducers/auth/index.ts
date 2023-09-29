import { createSlice } from "@reduxjs/toolkit";
import {
  IActionWithOutPayload,
  IActionWithpayload,
  IAuthReducer,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
} from "../../types";

const initialState: IAuthReducer = {
  user: {},
  isFetching: false,
  isLoggedin: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doLogin: (state: IAuthReducer, _action: IActionWithpayload<ISignInRequest>) => {
      state.isFetching = true;
      state.isLoggedin = false;
    },
    setToken: (state: IAuthReducer, action: IActionWithpayload<string>) => {
      state.token = action.payload;
    },
    doValidateToken: (state: IAuthReducer, _action: IActionWithOutPayload) => {
      state.isFetching = true;
    },
    setSigInResponse: (state: IAuthReducer, action: IActionWithpayload<ISignInResponse>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedin = true;
      }
      state.isFetching = false;
    },
    doLogout: (state: IAuthReducer, _action: IActionWithOutPayload) => {
      state.isFetching = true;
      state.isLoggedin = false;
      state.user = {};
      state.token = "";
      state.isFetching = false;
    },
    doSignUp: (state: IAuthReducer, _action: IActionWithpayload<ISignUpRequest>) => {
      state.isFetching;
    },
  },
});

export const { doLogin, doLogout, setSigInResponse, setToken, doValidateToken, doSignUp } = authSlice.actions;
