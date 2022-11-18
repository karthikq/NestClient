/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../Api";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getUser: (state, action) => {
      return (state = action.payload);
    },
    createUser: (state, action) => {
      return (state = action.payload);
    },
    logoutUser: (state, action) => {
      return (state = {});
    },
  },
});

export function createUserdata(userdetails, Callback) {
  return async function CreateUserthunk(dispatch) {
    try {
      const { data } = await backendApi.post("/auth/signup", userdetails);

      localStorage.setItem("authtoken", data.access_token);
      await dispatch(createUser(data.newUser));
      Callback(-1);
    } catch (error) {
      console.log(error);
      Callback(error.response.data);
    }
  };
}
export function getUserData() {
  return async function CreateUserthunk(dispatch, getState) {
    try {
      const { data } = await backendApi.get(`/auth/user`);

      await dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function loginuserdata(userdata, Callback) {
  return async function Loginthunk(dispatch) {
    try {
      const { data } = await backendApi.post("/auth/signin", userdata);
      await dispatch(getUser(data));
      Callback(-1);
    } catch (error) {
      console.log(error.response);
      Callback(error.response.data);
    }
  };
}

export function logoutUserData() {
  return async function logoutthunk(dispatch) {
    localStorage.removeItem("authtoken");
    dispatch(logoutUser());
  };
}
export const { getUser, createUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
