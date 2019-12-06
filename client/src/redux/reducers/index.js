import {combineReducers} from "redux";
import searchFlyQuerries from "./searchFlyQuerries";
import auth from "./auth";

export default combineReducers({
  searchFlyQuerries,
  auth,
});
