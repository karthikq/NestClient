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
  return (
    <div className="author-status-wrapper">
      <div className="author-status-contents">
        <Avatar />
        <form>
          <input type="text" placeholder="Whats happening?" />
        </form>
      </div>
      <Uploaditems open={openDialogbox} setOpen={setOpenDialogBox} />
      {openDialogbox && (
        <CustomDialog setOpen={setOpenDialogBox} setItems={setItems} />
      )}
      <div className="uploaded-items-wrapper">
        {items?.names?.map((item) => (
          <div className="uploaded-item">
            <CloseIcon className="cancel-upload-icon" />
            <p>{item.substring(0, 15)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorStatus;
