import {
  SET_DEPARTURE,
  SET_ARRIVAL,
  SET_DEPARTURE_DATE,
  SET_ARRIVAL_DATE,
  SET_SESSION_KEY,
  CLEAN_ARRIVAL_DATE,
} from "../actions/types";
import dateToday from "../../util/dateToday";

const initialState = {
  departure: "",
  arrival: "",
  departureDate: dateToday(),
  arrivalDate: "",
  sessionKey: "",
};

export default function(state = initialState, action) {
  const {type, payload} = action;
  const {departure} = state;
  switch (type) {
    case SET_DEPARTURE:
      return {...state, departure: payload.departure};
    case SET_ARRIVAL:
      if (departure !== payload.arrival) {
        return {...state, arrival: payload.arrival};
      } else {
        // TODO: validation"
        return {...state};
      }
    case SET_DEPARTURE_DATE:
      return {...state, departureDate: payload.departureDate};
    case SET_ARRIVAL_DATE:
      // todo work on departureDate it returns invalid date
      return {...state, arrivalDate: payload.arrivalDate};
    case SET_SESSION_KEY:
      return {...state, sessionKey: payload.sessionKey};
    case CLEAN_ARRIVAL_DATE:
      return {...state, arrivalDate: ""};
    default:
      return state;
  }
}
