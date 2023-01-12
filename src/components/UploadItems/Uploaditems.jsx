/** @format */

import React from "react";
import "./uploaditem.styles.scss";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-hot-toast";

const Uploaditems = ({ open, setOpen }) => {
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
        className="upload-item"
        onClick={() =>
          setOpen({
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
