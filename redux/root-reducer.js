import {combineReducers} from "redux";
import user from "./user/user.reducer";
import auth from "./auth/auth.reducer";
import medicalAssistance from "./medical-service/medical-service.reducer";
import medicalCamp from "./medical-camp/medical-camp.reducer";
import donationItem from "./donation-item/donation-item.reducer";
import chat from "./chat/chat.reducer";

const rootReducer = combineReducers({
  user,
  auth,
  medicalAssistance,
  medicalCamp,
  donationItem,
  chat,
});

export default rootReducer;
