/** @format */

import React, { useState } from "react";
import "./customdialog.styles.scss";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ setOpen }) => {
  const [file, setFile] = useState("");
  const [localUrl, setLocalUrl] = useState("");
  const handleFile = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setLocalUrl(fileUrl);
  };

  return (
    <div className="custom-dialog_wrapper">
      <div className="custom-dialog-contents">
        <h1>Choose a file to upload</h1>
        <form>
          <label className="fileinput" htmlFor="fileinput">
            Click here
          </label>
          <input
            onChange={(e) => handleFile(e.target.files[0])}
            type="file"
            accept=".jpg,.png,.jpeg"
            id="fileinput"
            placeholder="Choose a file"
          />
          {localUrl ? (
            <input type="text" placeholder="fileName" className="filename" />
          ) : (
            ""
          )}
        </form>
        {localUrl && (
          <div className="uploaded-file">
            <img src={localUrl} alt="err" />
          </div>
        )}
        {localUrl ? (
          <div className="upload-btn-wrapper">
            <button className="upload-btn">Upload</button>
          </div>
        ) : (
          ""
        )}

        <div className="close-wrapper">
          <CloseIcon onClick={() => setOpen(false)} className="close_icon" />
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
