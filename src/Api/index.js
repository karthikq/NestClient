/** @format */

import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:5000",
  transformRequest: [
    function (data, headers) {
      const authToken = localStorage.getItem("authtoken");
      headers["Authorization"] = `Bearer  ${authToken}`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
