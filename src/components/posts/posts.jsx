/** @format */

import React from "react";
import "./posts.styles.scss";

const Posts = () => {
  return (
    <div className="post-container">
      <div className="post-contents">
        <div className="post-details">
          <div className="post-image">
            <img src="" alt="err" />
          </div>
          <div className="post-desp">
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              nesciunt.
            </h2>
            <span className="post-createdate"></span>
            <span className="post-update"></span>
          </div>
          <div className="author">
            <img className="author-image" src="" alt="" />
            <p className="author-name"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
