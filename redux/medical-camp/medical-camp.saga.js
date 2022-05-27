import MedicalCampService from "@/repositories/MedicalCampRepository";
import Router from "next/router";
import {all, call, cancel, takeEvery, put} from "redux-saga/effects";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import {
  getMedicalCampsSuccess,
  getSelectedMedicalCampSuccess,
  getUsersMedicalCampSuccess,
} from "./medical-camp.actions";
import actionTypes from "./medical-camp.actionTypes";

function* createMedicalCampSaga(action) {
  try {
    const {message, description} = yield call(
      MedicalCampService.createMedicalCamp,
      action.payload
    );
    successNotification(message, description, "top", 8000);
    Router.push("/");
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* getMedicalCampsSaga(action) {
  try {
    const data = yield call(
      MedicalCampService.getMedicalCamps,
      action.name,
      action.city,
      action.campType
    );
    yield put(getMedicalCampsSuccess(data));
    if (action && action.callback) action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification(
        "Error",
        typeof error === "string"
          ? error
          : "Working on this minor update, try again soon"
      );
    }
  } finally {
    yield cancel();
  }
}

function* getSelectedMedicalCampSaga(action) {
  try {
    const medicalCamp = yield call(
      MedicalCampService.getMedicalCampById,
      action.id
    );
    yield put(getSelectedMedicalCampSuccess(medicalCamp));
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* getUsersMedicalCampSaga(action) {
  try {
    const medicalCamp = yield call(
      MedicalCampService.getMedicalCampByUserId,
      action.id
    );
    yield put(getUsersMedicalCampSuccess(medicalCamp));
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actionTypes.CREATE_MEDICAL_CAMP, createMedicalCampSaga),
    takeEvery(actionTypes.GET_MEDICAL_CAMPS_REQUEST, getMedicalCampsSaga),
    takeEvery(
      actionTypes.GET_SELECTED_MEDICAL_CAMP,
      getSelectedMedicalCampSaga
    ),
    takeEvery(
      actionTypes.GET_USER_MEDICAL_CAMPS_REQUEST,
      getUsersMedicalCampSaga
    ),
  ]);
}
