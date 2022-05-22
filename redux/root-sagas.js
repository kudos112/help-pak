import {all} from "redux-saga/effects";
import UserSagas from "./user/user.sagas";
import AuthSagas from "./auth/auth.saga";
import MedicalServiceSagas from "./medical-service/medical-service.saga";
import MedicalCampSagas from "./medical-camp/medical-camp.saga";
import DonationItemSagas from "./donation-item/donation-item.saga";

export default function* rootSaga() {
  yield all([
    UserSagas(),
    AuthSagas(),
    MedicalServiceSagas(),
    MedicalCampSagas(),
    DonationItemSagas(),
  ]);
}
