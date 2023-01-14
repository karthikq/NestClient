/** @format */

import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
  },
});
