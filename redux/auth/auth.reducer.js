import actionTypes from "./auth.actionTypes";

export const initState = {
  isLoggedIn: false,
  user: null,
};

function AuthReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{isLoggedIn: true, user: action.user},
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
}

export default AuthReducer;
