/** @format */

import React, { useState } from "react";
import "./customdialog.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CreateNewFile } from "../../firebase/upload";
import UploadIcon from "@mui/icons-material/Upload";

const CustomDialog = ({ setOpen }) => {
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [localUrl, setLocalUrl] = useState("");

  const handleFile = (file) => {
    setFile(file);
    setFileName(file.name);
    const fileUrl = URL.createObjectURL(file);
    setLocalUrl(fileUrl);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    console.log("S");
    CreateNewFile(file, fileName);
  };
  console.log(file);
  return (
    <div className="custom-dialog_wrapper">
      <div className="custom-dialog-contents">
        <h1>Choose a file to upload</h1>
        <form onSubmit={handleUpload}>
          <label className="fileinput" htmlFor="fileinput">
            <div class="circle-wrap">
              <div class="circle">
                <div class="mask full">
                  <div class="fill"></div>
                </div>
                <div class="mask half">
                  <div class="fill"></div>
                </div>
                <div class="inside-circle"> 75% </div>
              </div>
            </div>
            <UploadIcon />
          </label>
          <input
            onChange={(e) => handleFile(e.target.files[0])}
            type="file"
            accept=".jpg,.png,.jpeg"
            id="fileinput"
            placeholder="Choose a file"
          />
          {localUrl ? (
            <input
              type="text"
              placeholder="fileName"
              className="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          ) : (
            ""
          )}
          {localUrl && (
            <div className="uploaded-file">
              <img src={localUrl} alt="err" />
            </div>
          )}
          {localUrl ? (
            <div className="upload-btn-wrapper">
              <button type="submit" className="upload-btn">
                Upload
              </button>
            </div>
          ) : (
            ""
          )}
        </form>

        <div className="close-wrapper">
          <CloseIcon onClick={() => setOpen(false)} className="close_icon" />
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
