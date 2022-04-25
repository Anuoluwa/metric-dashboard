import axios from "axios";
import { BASE_URL } from "../../utils/endpoints";
import { returnError, returnSuccess } from "./alertActions";
import {
  ADDING_METRIC_START,
  ADD_METRIC_FAIL,
  ADD_METRIC_SUCCESS,
  LOADING_METRIC_START,
  LOAD_METRIC_FAIL,
  LOAD_METRIC_SUCCESS,
  LOADING_AVERAGE_METRIC_START,
  LOAD_AVERAGE_METRIC_FAIL,
  LOAD_AVERAGE_METRIC_SUCCESS,
} from "./actionTypes";

export const loadMetrics = () => (dispatch) => {
  dispatch({
    type: LOADING_METRIC_START,
  });

  axios
    .get(`${BASE_URL}/metrics/all`)
    .then((res) => {
      dispatch({
        type: LOAD_METRIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_METRIC_FAIL,
      });
    });
};

export const addMetric = (name, value) => (dispatch) => {
  dispatch({
    type: ADDING_METRIC_START,
  });
  const body = { name, value };

  axios
    .post(`${BASE_URL}/metrics`, body)
    .then((res) => {
      dispatch({
        type: ADD_METRIC_SUCCESS,
        payload: res.data,
      });
      dispatch(returnSuccess("Metric Added Successfully"));
      dispatch(loadMetrics());
    })
    .catch((err) => {
      dispatch({
        type: ADD_METRIC_FAIL,
      });
      dispatch(returnError("Error Occured"));
    });
};

export const loadMovingAverageMetrics = (windowPeriod) => (dispatch) => {
  dispatch({
    type: LOADING_AVERAGE_METRIC_START,
  });

  axios
    .get(`${BASE_URL}/metrics/?windowPeriod=${windowPeriod}`)
    .then((res) => {
      dispatch({
        type: LOAD_AVERAGE_METRIC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_AVERAGE_METRIC_FAIL,
      });
    });
};
