import {combineReducers} from "redux";
import user from "./user/user.reducer";
import auth from "./auth/auth.reducer";
import medicalAssistance from "./medical-service/medical-service.reducer";
import medicalCamp from "./medical-camp/medical-camp.reducer";

const rootReducer = combineReducers({
  user,
  auth,
  medicalAssistance,
  medicalCamp,
});

export default rootReducer;
