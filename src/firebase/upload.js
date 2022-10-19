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

export const CreateNewFile = async (file, name) => {
  const storage = getStorage();
  const storageRef = ref(storage, name);
  const metadata = {
    contentType: "image/jpeg",
  };
  const compressedImage = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    initialQuality: 1,
  });
  const uploadTask = uploadBytesResumable(
    storageRef,
    compressedImage,
    metadata
  );

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};
