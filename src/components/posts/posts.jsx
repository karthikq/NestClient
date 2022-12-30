/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";

import Comments from "../../Comments/Comments";
import Slider from "../Slider/Slider";
import { Avatar } from "@mui/material";
import Postdropdown from "../postdropdown/Postdropdown";
import TimeAgo from "react-timeago";
import PostDialogbox from "../PostDialogbox/PostDialogbox";
import { useContext } from "react";
import { Usercontextobj } from "../context/Usercontext";
const Posts = ({ item, user }) => {
  const [openComments, setOpenComments] = useState(false);
  const [postDialog, setPostDialog] = useState({
    state: "",
    data: [],
  });
  const ref = useRef();
  const updateSelUser = useContext(Usercontextobj);

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

  const handlePostdialog = (state, items) => {
    setPostDialog({
      state: state,
      data: items,
    });
  };
  return (
    <div ref={ref} className="post-container">
      {postDialog.state && (
        <PostDialogbox
          item={postDialog.data}
          postDialog={postDialog}
          setPostDialog={setPostDialog}
        />
      )}
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
              <p
                className="author-name"
                onClick={() => updateSelUser.setValue(item.user)}>
                {item.user.username}
              </p>
              <span className="post-duration">
                <TimeAgo date={new Date(item.created_at)} />
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
              <span onClick={() => handlePostdialog("likes", item.likes)}>
                {item?.likes?.length} likes
              </span>
              <span onClick={() => handlePostdialog("comments", item.comments)}>
                {item?.comments?.length} comments
              </span>
            </div>
            <Postinteraction
              setOpenComments={setOpenComments}
              openComments={openComments}
              post={item}
              user={user}
            />
          </div>
          <div className="post-action">
            <Postdropdown />
          </div>
        </div>
        {openComments && (
          <Comments item={item} user={user} openComments={openComments} />
        )}
      </div>
    </div>
  );
};

export default Posts;
