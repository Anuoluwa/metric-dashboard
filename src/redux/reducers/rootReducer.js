import { combineReducers } from "redux";
import metricReducers from "./metricReducers";

export default combineReducers({
  metric: metricReducers,
});
