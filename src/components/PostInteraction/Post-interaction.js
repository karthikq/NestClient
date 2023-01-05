/** @format */

import React, { useRef, useState } from "react";
import "./post-interaction.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../store/postsSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ErrorIcon, toast } from "react-hot-toast";

const Postinteraction = ({ setOpenComments, openComments, post, user }) => {
  const [selectedState, setselectedState] = useState(false);

  const dispatch = useDispatch();

  const handlePostLike = async () => {
    if (!user.userId) {
      return toast(
        (t) => (
          <span>
            Please login to continue
            <a href="/auth/login">
              <button className="toast-btn" onClick={() => toast.dismiss(t.id)}>
                Click here
              </button>
            </a>
          </span>
        ),
        {
          icon: (
            <ErrorIcon
              style={{ color: "#5814d6", position: "relative", left: 3 }}
            />
          ),
        }
      );
    }
    try {
      await dispatch(likePost(post.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post-interations-wrapper">
      <div
        onClick={handlePostLike}
        className={
          user.userId && post.likes.some((el) => el.user.userId === user.userId)
            ? "post-interaction post-int-active"
            : "post-interaction"
        }
      >
        {user.userId &&
        post.likes.some((el) => el.user.userId === user.userId) ? (
          <FavoriteIcon className="interaction-icon" onClick={handlePostLike} />
        ) : (
          <FavoriteBorderIcon className="interaction-icon" />
        )}
      </div>
      <div
        className={
          openComments
            ? "post-interaction post-int-active-com"
            : "post-interaction"
        }
        onClick={(e) => {
          setOpenComments((preValue) => !preValue);
        }}
      >
        <ChatBubbleOutlineIcon className="interaction-icon" />
      </div>
    </div>
  );
};

export default Postinteraction;
