/** @format */

import React, { useRef, useState } from "react";
import "./comments.styles.scss";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { createComment, deleteComment } from "../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const Comments = ({ item, user, openComments }) => {
  const [userComment, setUserComment] = useState("");
  const [preComments, setPrevComments] = useState(item.comments);
  const userData = useSelector((state) => state.user);
  const commentRef = useRef();
  const dispatch = useDispatch();

  const data = item.comments?.length > 0 ? item?.comments : [];

  const handleComment = (e) => {
    e.preventDefault();
    if (userComment) {
      dispatch(createComment(userComment, item.id));
      if (commentRef.current) {
        commentRef.current.scrollTop = 0;
      }
      setUserComment("");
      const el = document.querySelectorAll(".comment-details-wrapper")[0];
      el.style.background = "rgba(102, 51, 153, 0.09)";
      setTimeout(() => {
        el.style.background = "rgba(102, 51, 153, 0.03)";
      }, 1000);
    }
  };

  const sortedComments = [...data]?.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const handleDeleteComment = (commentId, postId) => {
    dispatch(deleteComment(commentId, postId));
  };

  return (
    <div className="post-comments-wrapper">
      {item && item?.comments?.length > 0 && (
        <div ref={commentRef} className="comments">
          {sortedComments.map((comment) => (
            <div className="comment-details-wrapper">
              <div className="author-comment">
                <Avatar
                  src={comment.user ? comment.user.url : ""}
                  alt="err"
                  style={{ width: 45, height: 45, borderRadius: 10 }}
                />
              </div>
              <div className="comment-details">
                <div className="comment-details-header">
                  <span className="comment-user">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"/user/" + comment.user.userId + "#post"}
                    >
                      {comment.user.username.substring(0, 7) + "."}
                    </Link>

                    {comment.user.userId === user?.userId && (
                      <span
                        className="comment-delete"
                        onClick={() => handleDeleteComment(comment.id, item.id)}
                      >
                        delete
                      </span>
                    )}
                  </span>
                  <span className="comment-time">
                    <TimeAgo date={new Date(comment.date)} />
                  </span>
                </div>
                <p>{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="create-comment">
        <form onSubmit={handleComment}>
          <input
            value={userComment}
            type="text"
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Add comment"
          />
          <button type="submit">
            <AddCommentIcon className="addcomment-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
