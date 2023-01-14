/** @format */

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { fireBaseApp } from "./index";
import imageCompression from "browser-image-compression";
fireBaseApp();

export const CreateNewFile = async (
  file,
  name,
  progressCallback,
  uploadcallback,
  state,
  type
) => {
  const storage = getStorage();
  const storageRef = ref(storage, name);
  const metadata = {
    contentType: "image/jpeg",
  };
  let compressedFile;

  if (type === "image") {
    compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      initialQuality: 1,
    });
  } else {
    compressedFile = file;
  }

  const uploadTask = uploadBytesResumable(storageRef, compressedFile, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      if (state) {
        progressCallback(progress);
        document
          .querySelectorAll("#upload-scroller")
          .forEach((el) => (el.style.height = progress + "%"));

        document
          .querySelectorAll("#upload-checkicon")
          .forEach((el) => (el.style.display = "none"));
      }
    },
    (error) => {
      console.log(error);
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (state) {
          if (downloadURL) {
            document
              .querySelectorAll("#upload-checkicon")
              .forEach((el) => (el.style.display = "block"));
          }
        }
        console.log(type);
        uploadcallback(downloadURL, name, type);
      });
    }
  );
};
