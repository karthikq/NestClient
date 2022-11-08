/** @format */

import React from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Posts = ({ item }) => {
  return (
    <div className="post-container">
      <div className="post-contents">
        <div className="author">
          <img
            className="author-image"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
            alt="err"
          />
        </div>
        <div className="post-details">
          <p className="author-name">{item.user.username}</p>
          <span className="post-duration">
            {new Date().toLocaleDateString()}
          </span>
          <div className="post-text">
            <h2 className="post-title">{item.title}</h2>
            <span className="post-createdate"></span>
            <span className="post-update"></span>
          </div>

          {item.imageUrls && (
            <div className="post-image">
              <img src="" alt="err" />
            </div>
          )}
          <div className="post-likes-wrapper">
            <span>likes</span>
            <span>comments</span>
          </div>
          <Postinteraction />
        </div>
      </div>
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
                <span>{comment.user.username}</span>
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
    </div>
  );
};

export default Posts;
