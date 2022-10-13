/** @format */

import { Avatar, Dialog, DialogTitle, List } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import Uploaditems from "../UploadItems/Uploaditems";
import "./authorstatus.styles.scss";

const AuthorStatus = () => {
  const [openDialogbox, setOpenDialogBox] = useState(false);

  return (
    <div className="author-status-wrapper">
      <div className="author-status-contents">
        <Avatar />
        <form>
          <input type="text" placeholder="Whats happening?" />
        </form>
      </div>
      <Uploaditems open={openDialogbox} setOpen={setOpenDialogBox} />
      {openDialogbox && <CustomDialog setOpen={setOpenDialogBox} />}
    </div>
  );
};

export default AuthorStatus;
