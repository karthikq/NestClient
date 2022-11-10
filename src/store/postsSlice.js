/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../Api";

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    getPosts: (state, action) => {
      return (state = action.payload);
    },
    createPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export function fetchposts() {
  return async function fetchThunkposts(dispatch, getState) {
    try {
      const { data } = await backendApi.get("/post/all");
      dispatch(getPosts(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export function createPostdata(postdata) {
  return async function Createpostthunk(dispatch, getState) {
    try {
      const { data } = await backendApi.post("/post/create", postdata);
      dispatch(createPost(data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}
export const { getPosts, createPost } = postsSlice.actions;
export default postsSlice.reducer;
