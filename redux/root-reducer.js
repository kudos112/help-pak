import {combineReducers} from "redux";
import user from "./user/user.reducer";
import auth from "./auth/auth.reducer";
import medicalAssistance from "./medical-service/medical-service.reducer";

const rootReducer = combineReducers({
  user,
  auth,
  medicalAssistance,
});

export default rootReducer;
