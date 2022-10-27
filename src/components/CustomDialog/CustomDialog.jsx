/** @format */

import React, { useState } from "react";
import "./customdialog.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CreateNewFile } from "../../firebase/upload";
import UploadIcon from "@mui/icons-material/Upload";

const CustomDialog = ({ setOpen, setItems }) => {
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [localUrl, setLocalUrl] = useState("");

  const handleFile = (file) => {
    setFile(file);
    setFileName(file.name);

    const fileUrl = URL.createObjectURL(file);
    setLocalUrl(fileUrl);
    setItems((preValue) => ({
      ...preValue,
      urls: [...preValue.urls, fileUrl],
    }));
  };
  const handleUpload = (e) => {
    e.preventDefault();
    setItems((preValue) => ({
      ...preValue,
      files: [...preValue.files, file],
      names: [...preValue.names, fileName],
    }));
    setOpen(false);
  };

  return (
    <div className="custom-dialog_wrapper">
      <div className="custom-dialog-contents">
        <h1>Choose a file to upload</h1>
        <form onSubmit={handleUpload}>
          <label className="fileinput" htmlFor="fileinput">
            <UploadIcon className="upload-icon" />
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
                Ok
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
