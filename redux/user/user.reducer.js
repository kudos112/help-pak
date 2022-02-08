import * as userActionTypes from "./user.types";

const INITIAL_STATE = {
  isLoggedin: false,
  currentUser: "null",
  error: "null",
};
const UserReducer = (state = INITIAL_STATE, action) => {
  console.log("In user reducers");
  switch (action.type) {
    case userActionTypes.SIGN_IN_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default UserReducer;
