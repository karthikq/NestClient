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

export function createUserdata(userdetails) {
  return async function CreateUserthunk(dispatch) {
    try {
      const { data } = await backendApi.post("/auth/signup", userdetails);
      console.log(data);
      dispatch(createUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const { getUser, createUser } = userSlice.actions;
export default userSlice.reducer;
