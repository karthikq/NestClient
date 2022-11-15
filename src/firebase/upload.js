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
  index,
  progressCallback,
  uploadcallback,
  state
) => {
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
      if (state) {
        progressCallback(progress);
        document.querySelectorAll(".upload-progress-status")[
          index
        ].style.height = progress + "%";
        document.querySelectorAll(".uploaded-checkicon")[index].style.display =
          "none";
      }
    },
    (error) => {
      console.log(error);
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(document.querySelector(".uploaded-items-wrapper"));
        if (state) {
          if (downloadURL) {
            document.querySelectorAll(".uploaded-checkicon")[
              index
            ].style.display = "block";
          }
          console.log("File available at", downloadURL);
        }

        uploadcallback(downloadURL, name);
      });
    }
  );
};
