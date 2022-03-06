import actionTypes from "./auth.actionTypes";

export function loginRequest(payload, callback) {
  return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}

export function userSignUpRequest(payload, callback) {
  return { type: actionTypes.USER_SIGNUP_REQUEST, payload, callback };
}

export function ngoSignUpRequest(payload, callback) {
  return { type: actionTypes.NGO_SIGNUP_REQUEST, payload, callback };
}

export function loginSuccess(user) {
  return { type: actionTypes.LOGIN_SUCCESS, user };
}

export function signUpSuccess() {
  return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOutRequest(callback) {
  return { type: actionTypes.LOGOUT, callback };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function forgotpasswordrequests(payload, callback) {
  return {
    type: actionTypes.FORGOTPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function resetPasswordRequests(payload, callback) {
  return {
    type: actionTypes.RESETPASSWORD_REQUEST,
    payload,
    callback,
  };
}
