import {
  SET_DEPARTURE,
  SET_ARRIVAL,
  SET_DEPARTURE_DATE,
  SET_ARRIVAL_DATE,
  SET_SESSION_KEY,
} from "../actions/types";

const dateToday = () => {
  const today = new Date();
  const dateToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return dateToday;
};

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
    default:
      return state;
  }
}
