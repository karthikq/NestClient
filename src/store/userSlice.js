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
  },
});

export function createUserdata(userdetails, navigate) {
  return async function CreateUserthunk(dispatch) {
    try {
      const { data } = await backendApi.post("/auth/signup", userdetails);
      console.log(data);
      localStorage.setItem("authtoken", data.access_token);
      await dispatch(createUser(data.newUser));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
}
export function getUserData() {
  return async function CreateUserthunk(dispatch, getState) {
    try {
      const { data } = await backendApi.get(`/auth/user`);
      console.log(data);
      await dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export const { getUser, createUser } = userSlice.actions;
export default userSlice.reducer;
