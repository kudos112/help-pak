import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import * as actionTypes from "./user.types";

function* signInStart(action) {
  console.log("user signed in");
}

export default function* rootSagas() {
  yield all([takeEvery(actionTypes.SIGN_IN_START, signInStart)]);
  //   yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  //   yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  //   yield all([
  //     takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  //   ]);
}
