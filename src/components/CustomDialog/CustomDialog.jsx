/** @format */

import React, { useState } from "react";
import "./customdialog.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CreateNewFile } from "../../firebase/upload";
import UploadIcon from "@mui/icons-material/Upload";

const CustomDialog = ({ setOpen, setItems, open }) => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [localUrl, setLocalUrl] = useState("");

  const handleFile = (file) => {
    console.log(file);
    setFile(file);
    setFileName(file.name);

    if (open.type === "image") {
      const fileUrl = URL.createObjectURL(file);
      setLocalUrl(fileUrl);
      setItems((preValue) => ({
        ...preValue,
        urls: [...preValue.urls, fileUrl],
      }));
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (fileName) {
      setItems((preValue) => ({
        ...preValue,
        files: [...preValue.files, file],
        names: [...preValue.names, fileName],
      }));
      setOpen({
        type: "",
        state: false,
      });
    }
  };

  return (
    <div className="custom-dialog_wrapper">
      <div className="custom-dialog-contents">
        <h1> {file ? "Choose another file" : "Choose a file to upload"}</h1>
        <form onSubmit={handleUpload}>
          <label className="fileinput" htmlFor="fileinput">
            <UploadIcon className="upload-icon" />
          </label>
          {open.type === "image" && (
            <input
              onChange={(e) => handleFile(e.target.files[0])}
              type="file"
              accept=".jpg,.png,.jpeg"
              id="fileinput"
              placeholder="Choose a file"
            />
          )}
          {open.type === "video" && (
            <input
              onChange={(e) => handleFile(e.target.files[0])}
              type="file"
              accept=".mp4"
              id="fileinput"
              placeholder="Choose a file"
            />
          )}
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
          {file && !fileName && (
            <span className="error-span">filename is required</span>
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
          <CloseIcon
            onClick={() =>
              setOpen({
                type: "",
                state: false,
              })
            }
            className="close_icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
