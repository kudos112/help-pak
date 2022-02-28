import { combineReducers } from "redux";
import user from "./user/user.reducer";
import auth from "./auth/auth.reducer";

const rootReducer = combineReducers({
  user,
  auth,
});

export default rootReducer;
