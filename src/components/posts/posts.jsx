/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";

import Comments from "../../Comments/Comments";
import Slider from "../Slider/Slider";

const Posts = ({ item }) => {
  const [openComments, setOpenComments] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickoutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenComments(false);
      }
    }
    document.addEventListener("click", handleClickoutside);
    return () => {
      document.removeEventListener("click", handleClickoutside);
    };
  }, []);
  let imagelist = item.images.length > 0 && item.images;

  let parsedImage = imagelist && imagelist.map((el) => JSON.parse(el));

  return (
    <div ref={ref} className="post-container">
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

          <div className="post-image-wrapper">
            <Slider images={parsedImage} />
          </div>

          <div className="post-likes-wrapper">
            <span>likes</span>
            <span>{item?.comments?.length} comments</span>
          </div>
          <Postinteraction
            setOpenComments={setOpenComments}
            openComments={openComments}
          />
        </div>
      </div>
      {openComments && <Comments item={item} />}
    </div>
  );
};

export default Posts;
