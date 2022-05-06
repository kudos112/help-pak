import MedicalAssistanceService from "@/repositories/MedicalServiceRepository";
import Router from "next/router";
import {all, call, cancel, takeEvery, put} from "redux-saga/effects";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import {
  getMedicalAssistancesSuccess,
  getSelectedMedicalAssistanceSuccess,
} from "./medical-service.actions";
import actionTypes from "./medical-service.actionTypes";

function* createMedicalAssistanceSaga(action) {
  try {
    const {message, description} = yield call(
      MedicalAssistanceService.createMedicalAssistance,
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

function* getMedicalAssistancesSaga(action) {
  console.log(action);
  try {
    const data = yield call(
      MedicalAssistanceService.getMedicalAssistances,
      action.name,
      action.city,
      action.serviceType
    );
    yield put(getMedicalAssistancesSuccess(data));
    if (action && action.callback) action.callback();
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* getSelectedMedicalAssistanceSaga(action) {
  console.log("in sagas");
  try {
    const medicalAssistance = yield call(
      MedicalAssistanceService.getMedicalAssistanceById,
      action.id
    );
    console.log(medicalAssistance);
    yield put(getSelectedMedicalAssistanceSuccess(medicalAssistance));
    action.callback();
  } catch (error) {
    console.log(error);
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
    takeEvery(actionTypes.CREATE_MEDICAL_SERIVCE, createMedicalAssistanceSaga),
    takeEvery(
      actionTypes.GET_MEDICAL_ASSISTANCES_REQUEST,
      getMedicalAssistancesSaga
    ),
    takeEvery(
      actionTypes.GET_SELECTED_MEDICAL_ASSISTANCE,
      getSelectedMedicalAssistanceSaga
    ),
  ]);
}