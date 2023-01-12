/** @format */

import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { loginuserdata } from "../../store/userSlice";
import UserLottie from "../Lottie/UserLottie";
import listenForOutsideClicks from "../Navbar/listenForOutsideClicks";
import "./postdialogbox.styles.scss";
import Timeago from "react-timeago";
const PostDialogbox = ({ item, postDialog, setPostDialog }) => {
  const menuRef = useRef();

  const handleOutsideclick = (e) => {
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
          {item.length > 0 ? (
            item.map((list) => (
              <a href={"/user/" + list.user.userId + "#settings"}>
                <div className="postdialogbox-item">
                  <Avatar
                    src={list.user.url}
                    style={{ width: 43, height: 43, borderRadius: 10 }}
                  />
                  <div className="postdialog-items-list">
                    <span>{list.user.username}</span>
                    <span>
                      <Timeago date={new Date(list?.date && list.date)} />
                    </span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <UserLottie />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDialogbox;
