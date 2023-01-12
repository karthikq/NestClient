/** @format */

import React, { useState } from "react";
import "./customdialog.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CreateNewFile } from "../../firebase/upload";
import UploadIcon from "@mui/icons-material/Upload";

const CustomDialog = ({ setOpen, setItems, open, items, images }) => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [localUrl, setLocalUrl] = useState("");
  const [fileExists, setFileExists] = useState(false);

  function checkFileNameexists(filetocheck) {
    const check1 = images.names?.find((name) => name === filetocheck);
    const check2 = items?.find(({ name }) => name === filetocheck);

    if (check1) {
      return true;
    }
    if (check2) {
      return true;
    }
    return false;
  }

  const handleFile = async (file) => {
    setFile(file);
    setFileName(file.name);

    const resl = images && checkFileNameexists(file.name);
    const fileUrl = URL.createObjectURL(file);
    setLocalUrl(fileUrl);

    if (resl) {
      setFileExists(true);
    } else {
      if (open.type === "image") {
        setItems((preValue) => ({
          ...preValue,
          urls: [...preValue.urls, fileUrl],
        }));
      }
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileExists) {
      if (fileName) {
        setItems((preValue) => ({
          ...preValue,
          files: [...preValue.files, file],
          names: [...preValue.names, fileName],
          type: [...preValue.type, open.type],
        }));
        setOpen({
          type: "",
          state: false,
        });
      }
    } else {
      setFileName("");
      setFile("");
      setLocalUrl("");
      setOpen({
        type: "",
        state: false,
      });
    }
  };

  return (
    <div className="custom-dialog_wrapper">
      <div className="custom-dialog-contents">
        <h1> {file ? "File Selected" : "Choose a file to upload"}</h1>
        <form onSubmit={handleUpload}>
          {!file && (
            <label className="fileinput" htmlFor="fileinput">
              <UploadIcon className="upload-icon" />
            </label>
          )}
          {open.type === "image" && (
            <input
              onChange={(e) => {
                handleFile(e.target.files[0]);
              }}
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
              accept=".mp4,.mkv"
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
          {open.type && (
            <span className="error-span">file already exists!</span>
          )}
          {fileExists && (
            <span className="error-span">file already exists!</span>
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
            onClick={() => {
              setFileName("");
              setFile("");
              setLocalUrl("");
              setOpen({
                type: "",
                state: false,
              });
            }}
            className="close_icon"
          />
        </div>
      </div>
    </div>
  );
};
CustomDialog.defaultProps = {
  items: [],
};

export default CustomDialog;
