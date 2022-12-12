/** @format */

import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { loginuserdata } from "../../store/userSlice";
import listenForOutsideClicks from "../Navbar/listenForOutsideClicks";
import "./postdialogbox.styles.scss";

const PostDialogbox = ({ item, postDialog, setPostDialog }) => {
  const menuRef = useRef();
  console.log(item);

  const handleOutsideclick = (e) => {
    console.log(e.target.contains(menuRef.current));
    if (!e.target.contains(menuRef.current)) {
      return;
    }
    setPostDialog({
      state: "",
      data: "",
    });
  };
  return (
    <div className="postdialogbox-wrapper" onClick={handleOutsideclick}>
      <div ref={menuRef} className="postdialogbox-contents">
        <div className="postdialogbox-box">
          {item.map((list) => (
            <a href={"/user/" + list.user.userId}>
              <div className="postdialogbox-item">
                <Avatar src={list.user.url} style={{ width: 40, height: 40 }} />
                <div>
                  <span>{list.user.username}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDialogbox;
