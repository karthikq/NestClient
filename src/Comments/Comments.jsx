/** @format */

import React, { useRef, useState } from "react";
import "./comments.styles.scss";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { createComment } from "../store/postsSlice";
import { useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import { useEffect } from "react";

const Comments = ({ item }) => {
  const [userComment, setUserComment] = useState("");
  const [preComments, setPrevComments] = useState(item.comments);

  const commentRef = useRef();
  const dispatch = useDispatch();

  const data = item.comments;

  const handleComment = (e) => {
    e.preventDefault();
    if (userComment) {
      dispatch(createComment(userComment, item.id));
      commentRef.current.scrollTop = 0;
      const el = document.querySelectorAll(".comment-details-wrapper")[0];
      el.style.background = "rgba(255, 255, 255, 0.065)";
      setTimeout(() => {
        el.style.background = "rgba(255, 255, 255, 0.01)";
      }, 1000);
      setUserComment("");
    }
  };

  const sortedComments = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="post-comments-wrapper">
      {item?.comments.length > 0 && (
        <div ref={commentRef} className="comments">
          {sortedComments.map((comment) => (
            <div className="comment-details-wrapper">
              <div className="author-comment">
                <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                  alt="err"
                />
              </div>
              <div className="comment-details">
                <div className="comment-details-header">
                  <span className="comment-user">
                    {comment.user.username}

                    <span className="comment-time">
                      <TimeAgo date={new Date(comment.date)} />
                    </span>
                    <span className="comment-delete">delete</span>
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
