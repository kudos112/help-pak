import * as userActionTypes from "./user.types";

export const signInStart = (data) => {
  return {
    type: userActionTypes.SIGN_IN_START,
    data,
  };
};
