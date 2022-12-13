/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../Api";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    fetchedUser: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    createUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = {};
    },
    updateFecthedUser: (state, action) => {
      state.fetchedUser = action.payload;
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
      localStorage.setItem("authtoken", data.access_token);
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

export function getUserbyId(userId) {
  return async function getUserByIdthunk(dispatch) {
    try {
      const { data } = await backendApi.get("/user/" + userId);
      dispatch(updateFecthedUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export const { getUser, createUser, logoutUser, updateFecthedUser } =
  userSlice.actions;
export default userSlice.reducer;
