/** @format */

import React, { useState } from "react";
import "./comments.styles.scss";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { createComment } from "../store/postsSlice";
import { useDispatch } from "react-redux";

const Comments = ({ item }) => {
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();
  const handleComment = (e) => {
    e.preventDefault();
    if (userComment) {
      dispatch(createComment(userComment, item.id));
    }
  };
  return (
    <div className="post-comments-wrapper">
      <div className="comments">
        {item.comments.map((comment) => (
          <div className="comment-details-wrapper">
            <div className="author-comment">
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                alt="err"
              />
            </div>
            <div className="comment-details">
              <span className="comment-user">
                {comment.user.username}
                <span className="comment-time">date</span>
              </span>
              <p>{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="create-comment">
        <form onSubmit={handleComment}>
          <input
            type="text"
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Add comment"
          />
          <AddCommentIcon className="addcomment-icon" />
        </form>
      </div>
    </div>
  );
};

export default Comments;
