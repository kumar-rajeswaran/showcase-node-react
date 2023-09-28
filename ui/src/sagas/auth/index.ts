import { put, PutEffect, takeLatest } from "redux-saga/effects";
import { doLogin, doLogout, doValidateToken, setSigInResponse, setToken } from "../../reducers";
import { authService } from "../../services";
import { IActionWithpayload, ISignInRequest, ISignInResponse } from "../../types";
import { SetAuthorizationHeader } from "services/api";

function* handleLogin(action: IActionWithpayload<ISignInRequest>): Generator<Promise<string> | PutEffect, void, string> {
  try {
    const loginRes = yield authService.login(action.payload);
    SetAuthorizationHeader(loginRes);
    yield put(setToken(loginRes));
  } catch (error) {
    console.log(error);
  }
}

function* handleValidateToken(): Generator<Promise<ISignInResponse> | PutEffect, void, ISignInResponse> {
  try {
    const loginRes = yield authService.validateToken();
    yield put(setSigInResponse(loginRes));
  } catch (error) {
    console.log(error);
    yield put(doLogout());
  }
}

export function* takeAllAuthActions() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(setToken.type, handleValidateToken);
  yield takeLatest(doValidateToken.type, handleValidateToken);
}
