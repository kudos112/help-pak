import { combineReducers } from "redux";
import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
