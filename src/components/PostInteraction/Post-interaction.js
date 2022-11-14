/** @format */

import React, { useRef, useState } from "react";
import "./post-interaction.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect } from "react";

const Postinteraction = ({ setOpenComments, openComments }) => {
  const [selectedState, setselectedState] = useState();

  return (
    <div className="post-interations-wrapper">
      <div
        className={
          selectedState === "like"
            ? "post-interaction post-int-active"
            : "post-interaction"
        }>
        <FavoriteIcon className="interaction-icon" />
        <span
          onClick={() => {
            setselectedState("like");
          }}>
          Like
        </span>
      </div>
      <div
        className={
          openComments ? "post-interaction post-int-active" : "post-interaction"
        }
        onClick={(e) => {
          setOpenComments((preValue) => !preValue);
        }}>
        <ChatBubbleOutlineIcon className="interaction-icon" />
        <span>Comment</span>
      </div>
    </div>
  );
};

export default Postinteraction;
