import {combineReducers} from "redux";
import searchFlyQuerries from "./searchFlyQuerries";
import auth from "./auth";
import profile from "./profile";
import alert from "./alert";

export default combineReducers({
  searchFlyQuerries,
  auth,
  profile,
  alert,
});
