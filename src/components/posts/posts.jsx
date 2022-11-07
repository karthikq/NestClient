/** @format */

import React from "react";
import "./posts.styles.scss";

const Posts = ({ item }) => {
  return (
    <div className="post-container">
      <div className="post-contents">
        <div className="post-details">
          <div className="author">
            <img
              className="author-image"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              alt="err"
            />
            <p className="author-name">{item.user.username}</p>
          </div>
          <div className="post-text">
            <h2>{item.title}</h2>
            <p className="post-desp">{item.desp}</p>
            <span className="post-createdate"></span>
            <span className="post-update"></span>
          </div>

          <div className="post-image">
            <img src="" alt="err" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
