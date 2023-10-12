import { createSlice } from "@reduxjs/toolkit";
import { IActionWithOutPayload, IActionWithPayload, IUser, IUserReducer } from "../../types";

const initialState: IUserReducer = {
  isFetching: false,
  user: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsers: (state: IUserReducer, _action: IActionWithOutPayload) => {
      state.isFetching = true;
    },
    setUsers: (state: IUserReducer, action: IActionWithPayload<IUser[]>) => {
      state.user = action.payload;
      state.isFetching = false;
    },
  },
});

export const { loadUsers, setUsers } = userSlice.actions;
