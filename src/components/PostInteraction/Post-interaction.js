/** @format */

import React from "react";
import "./post-interaction.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Postinteraction = ({ setOpenComments }) => {
  return (
    <div className="post-interations-wrapper">
      <div className="post-interaction">
        <FavoriteIcon className="interaction-icon" />
        <span>Like</span>
      </div>
      <div
        className="post-interaction"
        onClick={() => setOpenComments((preValue) => !preValue)}>
        <ChatBubbleOutlineIcon className="interaction-icon" />
        <span>Comment</span>
      </div>
    </div>
  );
};

export default Postinteraction;
