/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./posts.styles.scss";

import Postinteraction from "../PostInteraction/Post-interaction";
import { isMobile } from "react-device-detect";
import Comments from "../../Comments/Comments";
import Slider from "../Slider/Slider";
import { Avatar, Backdrop, CircularProgress } from "@mui/material";
import Postdropdown from "../postdropdown/Postdropdown";
import TimeAgo from "react-timeago";
import PostDialogbox from "../PostDialogbox/PostDialogbox";
import { useContext } from "react";
import { Usercontextobj } from "../context/Usercontext";
import PostAction from "../PostActions/PostAction";
import UploadedFiles from "../UploadedFiles/Uploadedfiles";
import { useDispatch } from "react-redux";
import { EditPost } from "../../store/postsSlice";
import { CreateNewFile } from "../../firebase/upload";

import CustomrLottie from "../Lottie/Lottie";
import querystrimg from "query-string";
import LoaderLottie from "../Lottie/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Posts = ({ item, user }) => {
  const [openComments, setOpenComments] = useState(false);
  const [postDialog, setPostDialog] = useState({
    state: "",
    data: [],
  });
  const [editState, setEditState] = useState(false);
  const [editPostData, setEditPostData] = useState({});
  const [activeClose, setactiveClose] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);

  const [uploadedImages, setUploadedImages] = useState({});
  const [images, setImages] = useState({
    files: [],
    urls: [],
    names: [],
  });
  const [uploadedUrl, setUploadedUrl] = useState([]);
  const [submitState, setSubmitState] = useState(false);

  const ref = useRef();
  const updateSelUser = useContext(Usercontextobj);
  const dispatch = useDispatch();
  const { postId } = querystrimg.parse(window.location.search);
  var count = 0;
  useEffect(() => {
    function handleClickoutside(e) {
      if (postId) {
        setTimeout(() => {
          window.history.pushState({}, "", "/");
        }, 500);
      }

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
      ref.current?.scrollIntoView({
        behavior: "smooth",
      });
      setEditPostData({
        title: item.title,
        images: item.images,
      });
      setUploadedImages(item.images);
    }
  }, [editState]);

  useEffect(() => {
    if (postId) {
      document.getElementById(postId).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [postId]);

  const handlePostdialog = (state, items) => {
    setPostDialog({
      state: state,
      data: items,
    });
  };

  const handleRemove = (itemIndex) => {
    const images = uploadedImages.filter((item, index) => index !== itemIndex);

    setUploadedImages(images);
  };

  const handleEditPostRemove = (itemIndex) => {
    const newFiles = images.files.filter((item, index) => index !== itemIndex);
    const newUrls = images.urls.filter((item, index) => index !== itemIndex);
    const newNames = images.names.filter((item, index) => index !== itemIndex);

    setImages({
      files: newFiles,
      urls: newUrls,
      names: newNames,
    });
  };

  let imagelist = editState
    ? uploadedImages.length > 0 && uploadedImages
    : item.images.length > 0 && item.images;
  let parsedImage = imagelist && imagelist.map((el) => JSON.parse(el));

  const handleCallback = (val) => {
    setProgress(val);
  };

  const callback = async (url, name) => {
    count++;

    if (parsedImage.length > 0) {
      if (count === images.names.length) {
        setUploadedUrl((prevalue) => [
          ...prevalue,
          ...parsedImage,
          { name, url },
        ]);
      } else {
        setUploadedUrl((prevalue) => [...prevalue, { name, url }]);
      }
    } else {
      setUploadedUrl((prevalue) => [...prevalue, { name, url }]);
    }
  };

  const totalImagesLength = uploadedImages.length + images.names.length;

  const cbEdit = () => {
    if (progress === 100) {
      setEditState(false);
      setSubmitState(false);
      setUploadedUrl([]);
      setImages({
        files: [],
        urls: [],
        names: [],
      });
    }
    setTimeout(() => {
      setLoader(false);
    }, 500);
    setImages({
      files: [],
      urls: [],
      names: [],
    });
    setUploadedUrl([]);
  };

  useEffect(() => {
    if (
      submitState &&
      totalImagesLength > 0 &&
      uploadedUrl?.length > 0 &&
      uploadedUrl.length === totalImagesLength
    ) {
      const data = {
        title: editPostData.title,
        images: uploadedUrl.length > 0 ? uploadedUrl : uploadedImages,
      };

      dispatch(EditPost(item.postId, data, cbEdit));
    }
  }, [submitState, uploadedUrl]);

  const handleUpload = async () => {
    await setSubmitState(true);
    setLoader(true);

    if (images.names?.length > 0 && images.names?.length < 3) {
      images.names.map(async (item, index) => {
        await CreateNewFile(
          images.files[index],
          item,
          handleCallback,
          callback,
          true
        );
      });
    } else {
      if (uploadedImages.length !== editPostData.images?.length) {
        const data = {
          title: editPostData.title,
          images: uploadedImages,
        };

        await dispatch(EditPost(item.postId, data, cbEdit));
        setEditState(false);
      } else {
        if (editPostData.title !== item.title) {
          const data = {
            title: editPostData.title,
            images: uploadedImages?.length > 0 ? uploadedImages : [],
          };

          await dispatch(EditPost(item.postId, data, cbEdit));
          setEditState(false);
          setImages({
            files: [],
            urls: [],
            names: [],
          });
          setUploadedUrl([]);
        } else {
          setLoader(false);
          setSubmitState(false);
          toast.error("Nothing to upload", {
            position: "bottom-center",
          });
        }
      }
    }
  };

  return (
    <div id={item?.postId} ref={ref} className="post-container">
      {postDialog.state && (
        <PostDialogbox
          item={postDialog.data}
          postDialog={postDialog}
          setPostDialog={setPostDialog}
        />
      )}
      {loader && (
        <div className="update-lottie">
          <LoaderLottie />
        </div>
      )}
      <Backdrop
        open={loader}
        sx={{
          color: "#fff",
          zIndex: 2000,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              {!isMobile ? (
                <p
                  className="author-name"
                  onClick={() => updateSelUser.setValue(item.user)}
                >
                  {item.user.username}
                </p>
              ) : (
                <p className="author-name">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={"/user/" + user.userId + "#post"}
                  >
                    {item.user.username}
                  </Link>
                </p>
              )}
              <span className="post-duration">
                <TimeAgo date={new Date(item.created_at)} />
              </span>
            </div>

            <div className="post-text">
              {editState ? (
                <input
                  value={editPostData.title ? editPostData.title : ""}
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
                  handleEditPostimages={handleRemove}
                  editState={true}
                  setUploadedImages={setUploadedImages}
                  images={images}
                  handleRemove={handleEditPostRemove}
                  setImages={setImages}
                />
              ) : (
                <Slider images={parsedImage} videoUrl={item.videoUrl} />
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
              {user.userId === item?.user?.userId && (
                <PostAction
                  post={item}
                  setEditState={setEditState}
                  editState={editState}
                  handleUpload={handleUpload}
                  submitState={submitState}
                  setSubmitState={setSubmitState}
                  user={user}
                />
              )}
            </div>
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
