/** @format */

import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:5000",
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] = `Bearer  ${localStorage.getItem("authtoken")}`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
