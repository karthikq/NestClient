/** @format */

import React, { useState } from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Comments from "../../Comments/Comments";

const Posts = ({ item }) => {
  const [openComments, setOpenComments] = useState(false);

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
          <Postinteraction setOpenComments={setOpenComments} />
        </div>
      </div>
      {openComments && <Comments item={item} />}
    </div>
  );
};

export default Posts;
