/** @format */

import React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { Avatar } from "@mui/material";
import "./avatar.styles.scss";

const CustomAvatar = ({ username, url }) => {
  let svg = createAvatar(style, {
    seed: username,
    dataUri: true,
  });

  let profileUrl = url ? URL.createObjectURL(url) : svg;

  return (
    <div className="custom-avatar">
      <Avatar
        src={profileUrl}
        sx={{ width: 45, height: 45 }}
        alt="avatart-image"
      />
    </div>
  );
};

export default CustomAvatar;
