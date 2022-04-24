import AuthService from "@/repositories/AuthenticationRepository";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import Router from "next/router";
import actionTypes from "./auth.actionTypes";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "~/components/fundamentals/notification/notification";
import {loginSuccess, logOutSuccess} from "./auth.actions";
import {appName} from "~/repositories/genericRepository";

function* userSignUpSaga(action) {
  try {
    const {message, description} = yield call(
      AuthService.userRegister,
      action.payload
    );
    successNotification(message, description, "top", 8000);
    Router.push("/");
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* ngoSignUpSaga(action) {
  try {
    const {message, description} = yield call(
      AuthService.ngoRegister,
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

function* loginSaga(action) {
  try {
    let _tokens;
    let _user;
    if (action.payload.tokens) {
      _tokens = action.payload.tokens;
    } else {
      const {user, tokens} = yield call(AuthService.login, action.payload);
      _tokens = {
        accessToken: tokens.access.accessToken,
        refreshToken: tokens.refresh.refreshToken,
      };
      _user = user;
    }
    yield put(loginSuccess(_user));
    for (const key of Object.keys(_tokens))
      localStorage.setItem(`${appName}_${key}`, _tokens[key]);
    action.callback();
    Router.push("/");
    successNotification("Welcome Back", "logged In successfully");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", error);
    }
  } finally {
    yield cancel();
  }
}

function* logOutSaga(action) {
  try {
    const payload = {
      refreshToken: localStorage.getItem(`${appName}_refreshToken`),
    };
    console.log(payload);
    yield call(AuthService.logout, payload);
    localStorage.removeItem(`${appName}_accessToken`);
    localStorage.removeItem(`${appName}_refreshToken`);
    successNotification("Information", "logout successfully");
    action.callback();
    Router.push("/");
    yield put(logOutSuccess());
  } catch (err) {
    console.log(err);
    errorNotification("Error", err);
  }
}

function* forgotpasswordSaga({payload, callback}) {
  try {
    yield call(AuthService.forgetPassword, payload);
    infoNotification(
      "Success",
      "Please check your email to reset the password"
    );
    if (callback) callback();
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

function* resetPasswordSaga({payload, callback}) {
  try {
    const token = Router.query.token;
    yield call(AuthService.resetPassword, payload, `token=${token}`);
    infoNotification("Success", "Your password has been changed successfully");
    if (callback) callback();
    Router.replace("/account/login");
  } catch (error) {
    errorNotification("Failed", error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.USER_SIGNUP_REQUEST, userSignUpSaga)]);
  yield all([takeEvery(actionTypes.NGO_SIGNUP_REQUEST, ngoSignUpSaga)]);
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  yield all([
    takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  ]);
  yield all([takeLatest(actionTypes.RESETPASSWORD_REQUEST, resetPasswordSaga)]);
}
