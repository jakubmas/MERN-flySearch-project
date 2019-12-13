import {
  GET_FLIGHT_PROFILE,
  FLIGHT_PROFILE_ERROR,
  CLEAR_FLIGHT_PROFILE,
  DELETE_FLIGHT,
  FLIGHT_ERROR,
} from "../actions/types";

const initialState = {
  flights: [],
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_FLIGHT_PROFILE:
      return {
        ...state,
        flights: payload,
        loading: false,
      };
    case FLIGHT_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        flights: null,
      };
    case CLEAR_FLIGHT_PROFILE:
      return {
        ...state,
        flights: null,
        loading: false,
      };
    case DELETE_FLIGHT:
      return {
        ...state,
        flights: state.flights.filter(flight => flight._id !== payload),
        loading: false,
      };
    case FLIGHT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
