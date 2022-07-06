import NgoService from "@/repositories/NgoRepository";
import Router from "next/router";
import {all, call, cancel, takeEvery, put} from "redux-saga/effects";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import {
  deleteSelectedNgoSuccess,
  getNgosSuccess,
  getSelectedNgoSuccess,
  getUsersNgoSuccess,
} from "./ngo.actions";
import actionTypes from "./ngo.actionTypes";

function* createNgoSaga(action) {
  try {
    const {message, description} = yield call(
      NgoService.createNgo,
      action.payload
    );
    successNotification(message, description, "top", 8000);
    action.callback();
    Router.push("/");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* getNgosSaga(action) {
  try {
    const data = yield call(
      NgoService.getNgos,
      action.name,
      action.city,
      action.reason,
      action.bankName,
      action.page
    );
    yield put(getNgosSuccess(data));
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

function* getSelectedNgoSaga(action) {
  try {
    const ngo = yield call(NgoService.getNgoById, action.id);
    yield put(getSelectedNgoSuccess(ngo));
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

function* deleteSelectedNgoSaga(action) {
  try {
    const ngo = yield call(NgoService.deleteNgoById, action.id);
    yield put(deleteSelectedNgoSuccess());
    successNotification(
      "Success",
      "Ngo deleted successfully",
      "top-right",
      3000
    );
    Router.back();
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

function* getUsersNgoSaga(action) {
  try {
    const ngo = yield call(NgoService.getNgoByUserId, action.id);
    yield put(getUsersNgoSuccess(ngo));
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
    takeEvery(actionTypes.CREATE_NGO, createNgoSaga),
    takeEvery(actionTypes.GET_NGOS_REQUEST, getNgosSaga),
    takeEvery(actionTypes.GET_SELECTED_NGO, getSelectedNgoSaga),
    takeEvery(actionTypes.DELETE_SELECTED_NGO, deleteSelectedNgoSaga),
    takeEvery(actionTypes.GET_USERS_NGOS_REQUEST, getUsersNgoSaga),
  ]);
}
