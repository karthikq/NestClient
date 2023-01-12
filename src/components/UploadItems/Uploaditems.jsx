/** @format */

import React from "react";
import "./uploaditem.styles.scss";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-hot-toast";

const Uploaditems = ({ open, setOpen, videoType }) => {
  const findVideoType =
    videoType.length > 0 && videoType.some((el) => el === "video");

  return (
    <div className="upload-options">
      <div
        className="upload-item"
        onClick={() =>
          setOpen({
            type: "image",
            state: true,
          })
        }
      >
        <img src="https://i.ibb.co/fdZP8GY/gallery.png" alt="err" />
        Photo
      </div>
      <div
        style={findVideoType ? { opacity: 0.5 } : { opacity: 1 }}
        className="upload-item"
        onClick={() =>
          findVideoType
            ? toast.error("You can only upload one video", {
                position: "bottom-center",
              })
            : setOpen({
                type: "video",
                state: true,
              })
        }
      >
        <img src="https://i.ibb.co/4N5QpWK/play.png" alt="err" />
        Video
      </div>
    </div>
  );
};

export default Uploaditems;
