/** @format */

import { Avatar, Dialog, DialogTitle, List } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import Uploaditems from "../UploadItems/Uploaditems";
import "./authorstatus.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { CreateNewFile } from "../../firebase/upload";

const AuthorStatus = () => {
  const [openDialogbox, setOpenDialogBox] = useState(false);
  const [userstatus, setUserStatus] = useState("");
  const [contentErr, setContentErr] = useState(false);
  const [activeClose, setactiveClose] = useState(true);
  const [items, setItems] = useState({
    files: [],
    urls: [],
    names: [],
  });
  console.log(items);
  const handleRemove = (itemIndex) => {
    const newFiles = items.files.filter((item, index) => index !== itemIndex);
    const newUrls = items.urls.filter((item, index) => index !== itemIndex);
    const newNames = items.names.filter((item, index) => index !== itemIndex);

    setItems({
      files: newFiles,
      urls: newUrls,
      names: newNames,
    });
    console.log(items);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userstatus) {
      return setContentErr(true);
    }
    items.names.map(async (item, index) => {
      await CreateNewFile(items.files[index], item, index);
    });
    setactiveClose(false);
  };
  const handleUploadprogres = (val) => {
    console.log(val);
  };
  return (
    <div className="author-status-wrapper">
      <div
        className={
          contentErr && userstatus.length === 0
            ? "author-status-contents author-no-status"
            : "author-status-contents"
        }>
        <Avatar />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={userstatus}
            placeholder="Whats happening?"
            onChange={(e) => setUserStatus(e.target.value)}
          />
          <div className="send-icon-wrapper">
            <button type="submit">
              <SendIcon className="send-icon" />
            </button>
          </div>
        </form>
      </div>
      {contentErr && userstatus.length === 0 && (
        <span className="error-content">Please add some content here</span>
      )}
      {items.files.length < 3 && (
        <Uploaditems open={openDialogbox} setOpen={setOpenDialogBox} />
      )}
      {openDialogbox && (
        <CustomDialog setOpen={setOpenDialogBox} setItems={setItems} />
      )}
      {items.names.length !== 0 && (
        <p className="upload-item-status">
          {activeClose
            ? " You can upload upto 3 Images & videos"
            : "Uploading please wait"}
        </p>
      )}
      <div className="uploaded-items-wrapper">
        {items?.names?.map((item, index) => (
          <div className="uploaded-item ">
            <div className="upload-progress-status"></div>
            <div className="uploaded-checkicon">
              <img src="https://i.ibb.co/9YWkXTT/accept.png" alt="tickmark" />
            </div>
            <img className="uploaded-img" src={items?.urls[index]} alt="err" />
            <div className="uploaded-item-details">
              {activeClose && (
                <CloseIcon
                  className="cancel-upload-icon"
                  onClick={() => handleRemove(index)}
                />
              )}
              <p>{item.substring(0, 18)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorStatus;
