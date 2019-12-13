import axios from "axios";
import {setAlert} from "./alert";

import {
  GET_FLIGHT_PROFILE,
  FLIGHT_PROFILE_ERROR,
  DELETE_FLIGHT,
  FLIGHT_ERROR,
} from "./types";

//Get current users flight profile
export const getCurrentFlightProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/ticket");
    console.log("res", res);
    dispatch({
      type: GET_FLIGHT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FLIGHT_PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Delete selected flight from flight profile
export const deleteFlight = id => async dispatch => {
  try {
    await axios.delete(`/api/ticket/${id}`);

    dispatch({
      type: DELETE_FLIGHT,
      payload: id,
    });

    dispatch(setAlert("Flight Removed", "success"));
  } catch (err) {
    dispatch({
      type: FLIGHT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
