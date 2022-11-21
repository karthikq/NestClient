/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";

import Comments from "../../Comments/Comments";
import Slider from "../Slider/Slider";
import { Avatar } from "@mui/material";

const Posts = ({ item, user }) => {
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
        <div className="post-wrapper">
          <div className="author">
            <Avatar
              className="author-image"
              src={item.user?.url ? item.user.url : ""}
              alt="err"
            />
          </div>
          <div className="post-details">
            <div>
              <p className="author-name">{item.user.username}</p>
              <span className="post-duration">
                {new Date().toLocaleDateString()}
              </span>
            </div>

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
        {openComments && <Comments item={item} user={user} />}
      </div>
    </div>
  );
};

export default Posts;
