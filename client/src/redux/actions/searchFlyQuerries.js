import {
  SET_DEPARTURE,
  SET_ARRIVAL,
  SET_DEPARTURE_DATE,
  SET_ARRIVAL_DATE,
} from "./types";

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
