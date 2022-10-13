/** @format */

import { Avatar } from "@mui/material";
import React from "react";
import "./homeuser.styles.scss";

const HomeUser = () => {
  return (
    <div className="homeuser-container">
      <div className="homeuser-contents">
        <div className="homeuser-image">
          <div className="homeuser-avatar">
            {" "}
            <Avatar src="" sx={{ width: 40, height: 40 }} />
          </div>
        </div>
        <div className="homeuser-details">
          <p>Author name</p>
          <span>@author</span>
          <span>Status</span>
        </div>
        <div className="homeuser-follows">
          <div>
            <p>1000</p>
            <span>Following</span>
          </div>
          <div>
            <p>1000</p>
            <span>Following</span>
          </div>
        </div>
        <div className="homeuser-link">
          <a href="/user">My Profile</a>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
