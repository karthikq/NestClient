/** @format */

import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./homeuser.styles.scss";

const HomeUser = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="homeuser-container">
      <div className="homeuser-contents">
        <div className="homeuser-image">
          <div className="homeuser-avatar">
            <Avatar src={user.url} sx={{ width: 40, height: 40 }} />
          </div>
        </div>
        <div className="homeuser-details">
          <p>{user.username}</p>
          <span>@{user.username}</span>
          <span> </span>
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
