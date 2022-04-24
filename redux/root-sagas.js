import {all} from "redux-saga/effects";
import UserSagas from "./user/user.sagas";
import AuthSagas from "./auth/auth.saga";
import MedicalServiceSagas from "./medical-service/medical-service.saga";

export default function* rootSaga() {
  yield all([UserSagas(), AuthSagas(), MedicalServiceSagas()]);
}
