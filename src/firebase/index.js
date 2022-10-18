/** @format */

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const fireBaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB22W2A1b2xDo_Ytb49z6tWbwfJ_GXjwJ8",
    authDomain: "media-f418e.firebaseapp.com",
    projectId: "media-f418e",
    storageBucket: "media-f418e.appspot.com",
    messagingSenderId: "320695164459",
    appId: "1:320695164459:web:9c8bea40d18a063c65d46e",
  };

  const app = initializeApp(firebaseConfig);
  return getStorage(app);
};
