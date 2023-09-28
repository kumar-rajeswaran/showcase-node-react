import { PutEffect, takeLatest, put } from "@redux-saga/core/effects";
import { loadUsers, setUsers } from "../../reducers";
import { userService } from "../../services";
import { IUser } from "types";

function* handleUsers(): Generator<Promise<IUser[]> | PutEffect, void, IUser[]> {
  try {
    const users = yield userService.get();
    yield put(setUsers(users));
  } catch (error) {
    console.log(error);
  }
}

export function* takeAllUserActions() {
  yield takeLatest(loadUsers.type, handleUsers);
}
