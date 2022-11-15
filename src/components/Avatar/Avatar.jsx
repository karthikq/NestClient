/** @format */

import React from "react";

import { Avatar } from "@mui/material";
import "./avatar.styles.scss";
import { useEffect } from "react";

const CustomAvatar = ({ username, url, imageRef, setuserimage }) => {
  let profileUrl = url
    ? URL.createObjectURL(url)
    : `https://avatars.dicebear.com/api/bottts/${username}.svg`;
  useEffect(() => {
    if (!url) {
      setuserimage(profileUrl);
    } else {
      setuserimage("");
    }
  }, [profileUrl, url]);
  return (
    <div ref={imageRef} className="custom-avatar">
      <Avatar
        src={
          profileUrl
            ? profileUrl
            : `https://avatars.dicebear.com/api/bottts/${username}.svg`
        }
        sx={{ width: 45, height: 45 }}
        alt="avatart-image"
      />
    </div>
  );
};

export default CustomAvatar;
