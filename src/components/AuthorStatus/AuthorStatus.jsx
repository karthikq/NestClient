/** @format */

import { Avatar, Dialog, DialogTitle, List } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import Uploaditems from "../UploadItems/Uploaditems";
import "./authorstatus.styles.scss";
import CloseIcon from "@mui/icons-material/Close";

const AuthorStatus = () => {
  const [openDialogbox, setOpenDialogBox] = useState(false);
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

  return (
    <div className="author-status-wrapper">
      <div className="author-status-contents">
        <Avatar />
        <form>
          <input type="text" placeholder="Whats happening?" />
        </form>
      </div>
      {items.files.length < 3 && (
        <Uploaditems open={openDialogbox} setOpen={setOpenDialogBox} />
      )}
      {openDialogbox && (
        <CustomDialog setOpen={setOpenDialogBox} setItems={setItems} />
      )}
      {items.names.length !== 0 && (
        <p className="upload-item-status">
          You can upload upto 3 Images & videos{" "}
        </p>
      )}
      <div className="uploaded-items-wrapper">
        {items?.names?.map((item, index) => (
          <div className="uploaded-item">
            <CloseIcon
              className="cancel-upload-icon"
              onClick={() => handleRemove(index)}
            />
            <p>{item.substring(0, 18)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorStatus;
