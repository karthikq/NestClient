/** @format */

import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:5000",
  transformRequest: [
    function (data, headers) {
      headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZGFmZmdhIiwic3ViIjoiZW1haXJzZUBtYWlsLmNvbSIsImlhdCI6MTY2ODA1NDEyMSwiZXhwIjoxNjY4MTQwNTIxfQ.EnK-mkkvvc-_A_IyPiNmvTfvf9agQPGxreq-ywSiUIE`;
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
