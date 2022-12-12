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
    updatePost: (state, action) => {
      return state.map((item) => {
        return item.id === action.payload.id ? action.payload : item;
      });
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

export function createComment(message, postid) {
  return async function createCommentthunk(dispatch, getState) {
    try {
      const { data } = await backendApi.patch("/comment/post/" + postid, {
        message,
      });

      dispatch(updatePost(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteComment(commentId, postId) {
  return async function deleteCommentThunk(dispatch) {
    try {
      const { data } = await backendApi.delete(
        "/comment/post/delete/" + postId + "?commentId=" + commentId
      );
      dispatch(updatePost(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export function likePost(postId) {
  return async function likePostthunk(dispatch) {
    try {
      const { data } = await backendApi.patch("/like/post/" + postId);
      console.log(data);
      dispatch(updatePost(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export const { getPosts, createPost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
