import FundraisingService from "@/repositories/FundraisingRepository";
import Router from "next/router";
import {all, call, cancel, takeEvery, put} from "redux-saga/effects";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import {
  deleteSelectedFundraisingSuccess,
  getFundraisingsSuccess,
  getSelectedFundraisingSuccess,
  getUsersFundraisingSuccess,
} from "./fundraising.actions";
import actionTypes from "./fundraising.actionTypes";

function* createFundraisingSaga(action) {
  try {
    const {message, description} = yield call(
      FundraisingService.createFundraising,
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

function* getFundraisingsSaga(action) {
  try {
    const data = yield call(
      FundraisingService.getFundraisings,
      action.name,
      action.city,
      action.reason,
      action.bankName
    );
    yield put(getFundraisingsSuccess(data));
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

function* getSelectedFundraisingSaga(action) {
  try {
    const fundraising = yield call(
      FundraisingService.getFundraisingById,
      action.id
    );
    yield put(getSelectedFundraisingSuccess(fundraising));
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

function* deleteSelectedFundraisingSaga(action) {
  try {
    const fundraising = yield call(
      FundraisingService.deleteFundraisingById,
      action.id
    );
    yield put(deleteSelectedFundraisingSuccess());
    successNotification(
      "Success",
      "Fundraising deleted successfully",
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

function* getUsersFundraisingSaga(action) {
  try {
    const fundraising = yield call(
      FundraisingService.getFundraisingByUserId,
      action.id
    );
    yield put(getUsersFundraisingSuccess(fundraising));
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
    takeEvery(actionTypes.CREATE_FUNDRAISING, createFundraisingSaga),
    takeEvery(actionTypes.GET_FUNDRAISINGS_REQUEST, getFundraisingsSaga),
    takeEvery(actionTypes.GET_SELECTED_FUNDRAISING, getSelectedFundraisingSaga),
    takeEvery(
      actionTypes.DELETE_SELECTED_FUNDRAISING,
      deleteSelectedFundraisingSaga
    ),
    takeEvery(
      actionTypes.GET_USERS_FUNDRAISINGS_REQUEST,
      getUsersFundraisingSaga
    ),
  ]);
}
