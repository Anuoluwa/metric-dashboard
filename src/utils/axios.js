import Axios from "axios";
const baseURL = "https://metrics-fact.herokuapp.com/api/v1";

export const axios = Axios.create({ baseURL });
