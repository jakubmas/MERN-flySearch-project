import {
  SET_DEPARTURE,
  SET_ARRIVAL,
  SET_DEPARTURE_DATE,
  SET_ARRIVAL_DATE,
  SET_SESSION_KEY,
  CLEAN_ARRIVAL_DATE,
} from "./types";

import {setAlert} from "./alert";

export const setDeparture = departure => {
  return {type: SET_DEPARTURE, payload: {departure}};
};
export const setArrival = arrival => {
  return {type: SET_ARRIVAL, payload: {arrival}};
};
export const setDepartureDate = departureDate => {
  return {type: SET_DEPARTURE_DATE, payload: {departureDate}};
};
export const setArrivalDate = arrivalDate => {
  return {type: SET_ARRIVAL_DATE, payload: {arrivalDate}};
};
export const setSessionKey = sessionKey => {
  console.log("sessionKey z reduxa", sessionKey);
  return {type: SET_SESSION_KEY, payload: {sessionKey}};
};
export const calendarValidation = () => async dispatch => {
  dispatch(setAlert("Arrival date can not be before departure date", "danger"));
  return {type: CLEAN_ARRIVAL_DATE};
};
