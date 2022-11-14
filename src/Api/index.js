/** @format */

import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:5000",
  transformRequest: [
    function (data, headers) {
      headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2I0OWMwMy00OWY5LTQzNGItOGY4Ni04MGM4M2JiNjg1M2UiLCJzdWIiOiJlbWFpcnNlQG1haWwuY29tIiwiaWF0IjoxNjY4NDAxMjI0LCJleHAiOjE2Njg0ODc2MjR9.PpfdklxGgCs365YSA9IaBzeLofYXV4UbyGwX9NIu7VI`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
