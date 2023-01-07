/** @format */

import axios from "axios";

export const backendApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : "https://testingnestjs2.onrender.com",
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] = `Bearer  ${localStorage.getItem("authtoken")}`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
