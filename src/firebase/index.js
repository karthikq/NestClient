/** @format */

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const fireBaseApp = () => {
  const firebaseConfig = {};

  const app = initializeApp(firebaseConfig);
  return getStorage(app);
};
