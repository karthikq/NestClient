/** @format */

import React from "react";
import "./comments.styles.scss";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Comments = ({ item }) => {
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
        <form>
          <input type="text" placeholder="Add comment" />
          <AddCommentIcon className="addcomment-icon" />
        </form>
      </div>
    </div>
  );
};

export default Comments;
