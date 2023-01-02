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
import PostAction from "../PostActions/PostAction";
import UploadedFiles from "../UploadedFiles/Uploadedfiles";
import { useDispatch } from "react-redux";
import { EditPost } from "../../store/postsSlice";

const Posts = ({ item, user }) => {
  const [openComments, setOpenComments] = useState(false);
  const [postDialog, setPostDialog] = useState({
    state: "",
    data: [],
  });
  const [editState, setEditState] = useState(false);
  const [editPostData, setEditPostData] = useState({});
  const [activeClose, setactiveClose] = useState(true);
  const [uploadedImages, setUploadedImages] = useState({});

  const ref = useRef();
  const updateSelUser = useContext(Usercontextobj);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (editState) {
      setEditPostData({
        title: item.title,
        images: item.images,
      });
      setUploadedImages(item.images);
    }
  }, [editState]);

  const handlePostdialog = (state, items) => {
    setPostDialog({
      state: state,
      data: items,
    });
  };

  const handleRemove = (itemIndex) => {
    const newUrls = editPostData.images.filter(
      (item, index) => index !== itemIndex
    );
    const newNames = editPostData.images.filter(
      (item, index) => index !== itemIndex
    );

    setUploadedImages({
      urls: newUrls,
      names: newNames,
    });
    console.log(uploadedImages);
  };

  let imagelist = editState
    ? uploadedImages.length > 0 && uploadedImages
    : item.images.length > 0 && item.images;
  let parsedImage = imagelist && imagelist.map((el) => JSON.parse(el));

  const handleUpload = async () => {
    const data = {
      title: editPostData.title,
      images: uploadedImages.length > 0 ? uploadedImages : [],
    };
    dispatch(EditPost(item.postId, data));
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
                onClick={() => updateSelUser.setValue(item.user)}
              >
                {item.user.username}
              </p>
              <span className="post-duration">
                <TimeAgo date={new Date(item.created_at)} />
              </span>
            </div>

            <div className="post-text">
              {editState ? (
                <input
                  value={editPostData ? editPostData.title : ""}
                  placeholder="text"
                  onChange={(e) =>
                    setEditPostData({ ...editPostData, title: e.target.value })
                  }
                />
              ) : (
                <h2 className="post-title">{item.title}</h2>
              )}
              <span className="post-createdate"></span>
              <span className="post-update"></span>
            </div>

            <div className="post-image-wrapper">
              {editState ? (
                <UploadedFiles
                  items={parsedImage}
                  handleRemove={handleRemove}
                  editState={true} setUploadedImages={setUploadedImages}
                />
              ) : (
                <Slider images={parsedImage} />
              )}
            </div>

            <div className="post-likes-wrapper">
              <span onClick={() => handlePostdialog("likes", item.likes)}>
                {item?.likes?.length} likes
              </span>
              <span onClick={() => handlePostdialog("comments", item.comments)}>
                {item?.comments?.length} comments
              </span>
            </div>
            <div className="post-useraction">
              <Postinteraction
                setOpenComments={setOpenComments}
                openComments={openComments}
                post={item}
                user={user}
              />
              <PostAction
                post={item}
                setEditState={setEditState}
                editState={editState}
                handleUpload={handleUpload} 
              />
            </div>
          </div>
          <div className="post-action">
            <Postdropdown />
          </div>
        </div>
        {openComments && (
          <Comments item={item} user={user} openComments={openComments}  />
        )}
      </div>
    </div>
  );
};

export default Posts;
