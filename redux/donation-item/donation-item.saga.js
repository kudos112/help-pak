import DonationItemService from "@/repositories/DonationItemRepository";
import Router from "next/router";
import {all, call, cancel, takeEvery, put} from "redux-saga/effects";
import {
  errorNotification,
  successNotification,
} from "~/components/fundamentals/notification/notification";
import {
  getDonationItemsSuccess,
  getSelectedDonationItemSuccess,
  getUsersDonationItemSuccess,
} from "./donation-item.actions";
import actionTypes from "./donation-item.actionTypes";

function* createDonationItemSaga(action) {
  try {
    const {message, description} = yield call(
      DonationItemService.createDonationItem,
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

function* getDonationItemsSaga(action) {
  try {
    const data = yield call(
      DonationItemService.getDonationItems,
      action.name,
      action.city,
      action.category,
      action.condition
    );
    yield put(getDonationItemsSuccess(data));
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

function* getSelectedDonationItemSaga(action) {
  try {
    const donationItem = yield call(
      DonationItemService.getDonationItemById,
      action.id
    );
    yield put(getSelectedDonationItemSuccess(donationItem));
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

function* getUsersDonationItemSaga(action) {
  try {
    const donationItem = yield call(
      DonationItemService.getDonationItemByUserId,
      action.id
    );
    yield put(getUsersDonationItemSuccess(donationItem));
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
    takeEvery(actionTypes.CREATE_DONATION_ITEM, createDonationItemSaga),
    takeEvery(actionTypes.GET_DONATION_ITEMS_REQUEST, getDonationItemsSaga),
    takeEvery(
      actionTypes.GET_SELECTED_DONATION_ITEM,
      getSelectedDonationItemSaga
    ),
    takeEvery(
      actionTypes.GET_USERS_DONATION_ITEMS_REQUEST,
      getUsersDonationItemSaga
    ),
  ]);
}
