/** @format */

import axios from "axios";
import { backendUrl } from "./backendUrl";

export const backendApi = axios.create({
  baseURL: backendUrl(),
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] = `Bearer  ${localStorage.getItem("authtoken")}`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
