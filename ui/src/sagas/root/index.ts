import { takeAllUserActions } from "../users";
import { all, fork } from 'redux-saga/effects'
import { takeAllAuthActions } from "../auth";

export function* rootSaga() {
  yield all([
    fork(takeAllUserActions),
    fork(takeAllAuthActions)
  ])
}