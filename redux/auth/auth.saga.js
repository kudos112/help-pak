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
} from "~/components/notification/notification";
import { loginSuccess, logOutSuccess } from "./auth.actions";
import { appName } from "~/repositories/genericRepository";

function* signUpSaga(action) {
  try {
    console.log("Sign Up saga auth here");
    console.log(action);
    const response = yield call(AuthService.register, action.payload);

    console.log("Response ", response);

    // for (const key of Object.keys(tokens))
    //   localStorage.setItem(`${appName}_${key}`, tokens[key]);
    // modalSuccess("success");

    yield put(loginSuccess(payload.user));

    // const notAuthCart = JSON.parse(localStorage.getItem("not-auth-cart"));
  } catch (err) {
    notification.error({
      message: "Failed",
      description: err + "",
    });
    throw err;
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
      const { user, tokens } = yield call(AuthService.login, action.payload);
      _tokens = tokens;
      _user = user;
    }
    successNotification("Welcome Back", "logged In successfully");
    console.log("logged in called");
    yield put(loginSuccess(_user));
    Router.push("/");
    action.callback();

    // for (const key of Object.keys(_tokens))
    //   localStorage.setItem(`${appName}_${key}`, _tokens[key]);

    // if (action.payload.tokens) {
    //   yield put(getUserDetails());
    // } else {

    // }
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      errorNotification("Error", "Incorrect username or password");
    }
    console.log(error);
  } finally {
    yield cancel();
  }
}

// function* logOutSaga() {
//   try {
//     yield call(AuthService.logout);
//     yield put(logOutSuccess());
//     localStorage.removeItem(`${appName}_xAuthToken`);
//     localStorage.removeItem(`${appName}_refreshToken`);
//     modalWarning("warning");
//     Router.replace("/");
//   } catch (err) {}
// }

// function* forgotpasswordSaga({ method, payload, callback }) {
//   try {
//     switch (method) {
//       case "send-otp":
//         yield call(AuthService.sendotp, payload);
//         notification.success({
//           message: "Success",
//           description: "Please check your email for the OTP",
//         });
//         if (callback) callback();
//         break;
//       case "verify-otp":
//         yield call(AuthService.verifyOtp, payload);
//         notification.success({
//           message: "Success",
//           description: "OTP has been verified!",
//         });
//         if (callback) callback();
//         break;
//       case "newpassword":
//         yield call(AuthService.newpassword, payload);
//         notification.success({
//           message: "Success",
//           description: "Your password has been reset!",
//         });
//         if (callback) callback();
//         break;
//     }
//   } catch (error) {
//     notification.error({
//       message: "Failed",
//       description: error + "",
//     });
//     if (callback) callback(true);
//   } finally {
//     yield cancel();
//   }
// }

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.SIGNUP_REQUEST, signUpSaga)]);
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  // yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  // yield all([
  //   takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  // ]);
}
