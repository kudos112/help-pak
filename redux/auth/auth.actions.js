import actionTypes from "./auth.actionTypes";

export function loginRequest(payload, callback) {
  return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}

export function register() {
  const payload = {
    userType: "NGO",
    name: "Abdul Quddous",
    email: "quddoux112@gmail.com",
    password: "1q2w3e4r",
  };

  console.log("Register new user ", payload);
  return { type: actionTypes.SIGNUP_REQUEST, payload };
}

export function loginSuccess(user) {
  console.log("Going to login with user: ", user);
  return { type: actionTypes.LOGIN_SUCCESS, user };
}

export function signUpSuccess() {
  return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOutRequest() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

// export function forgotpasswordrequests(method, payload, callback) {
//   return {
//     type: actionTypes.FORGOTPASSWORD_REQUEST,
//     method,
//     payload,
//     callback,
//   };
// }
