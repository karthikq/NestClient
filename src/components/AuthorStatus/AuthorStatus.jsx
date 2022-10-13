/** @format */

import { Avatar } from "@mui/material";
import React from "react";
import "./authorstatus.styles.scss";

const AuthorStatus = () => {
  return (
    <div className="author-status-wrapper">
      <div className="author-status-contents">
        <Avatar />
        <form>
          <input type="text" placeholder="Whats happening?" />
        </form>
      </div>
    </div>
  );
};

export default AuthorStatus;
