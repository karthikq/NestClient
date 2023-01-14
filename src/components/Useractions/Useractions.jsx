/** @format */

import React, { useEffect } from "react";
import "./useractions.styles.scss";
import TimeAgo from "react-timeago";
import Slider from "../Slider/Slider";

import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import PostDialogbox from "../PostDialogbox/PostDialogbox";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const Useractions = ({ item, user, fetchedUser }) => {
  let imagelist = item.images.length > 0 && item.images;
  let parsedImage = imagelist && imagelist.map((el) => JSON.parse(el));

  const [postData, setPostData] = useState({});
  const [postDialog, setPostDialog] = useState({
    state: "",
    data: [],
  });

  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts);
  const { postId } = queryString.parse(window.location.search);

  useEffect(() => {
    if (postId) {
      setTimeout(() => {
        window.history.pushState({}, "", "?" + window.location.hash);
      }, 600);
    }
  }, []);

  useEffect(() => {
    if (postId && postData) {
      setTimeout(() => {
        document.getElementById(postId + "userwrapper").scrollIntoView({
          behavior: "smooth",
        });

        document.getElementById(postId + "usercontents").style.border =
          "2px solid #5814d683";
      }, 500);

      setTimeout(() => {
        document.getElementById(postId + "usercontents").style.border =
          "2px solid rgba(0, 0, 0, 0.082)";
      }, 4000);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostDetails(item.postId);
  }, [item.id]);

  const fetchPostDetails = async (id) => {
    const sortedarr = [...posts].sort(function (a, b) {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const filterdPost = sortedarr.find((el) => el.postId === id);

    setPostData(filterdPost);
  };
  const handlePostdialog = (state, items) => {
    setPostDialog({
      state: state,
      data: items,
    });
  };
  const handlePostEdit = (postId, state) => {
    navigate("/?postId=" + postId + "&editquery=" + state, {
      state: {
        value: window.location.pathname,
        postId,
        hash: window.location.hash,
      },
    });
  };

  return (
    <div id={postData?.postId + "userwrapper"} className="useraction-wrapper">
      {postDialog.state && (
        <PostDialogbox
          item={postDialog.data}
          postDialog={postDialog}
          setPostDialog={setPostDialog}
        />
      )}
      <div
        id={postData?.postId + "usercontents"}
        className="useraction-contents"
      >
        <h2>{postData.title}</h2>
        <div className="useraction-imagewrapper">
          <Slider images={parsedImage} videoUrl={postData.videoUrl} />
        </div>

        <div className="useraction-likes">
          <span onClick={() => handlePostdialog("likes", postData.likes)}>
            {postData.likes?.length} Likes
          </span>
          <span onClick={() => handlePostdialog("comments", postData.comments)}>
            {postData.comments?.length} Comments
          </span>
        </div>
        <div className="useraction-post-details">
          <span>
            Posted <TimeAgo date={new Date(postData.created_at)} />
          </span>
          <div className="useraction-edit-wrapper">
            {user.userId === fetchedUser.userId && (
              <p
                title="Edit Post"
                className="user-post_edit-icon"
                onClick={() => handlePostEdit(postData.postId, true)}
              >
                <EditIcon className="user-edit-icon" />
              </p>
            )}
            <p
              className="add-comment"
              onClick={() => handlePostEdit(postData.postId, false)}
            >
              Add Like & Comment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Useractions;
