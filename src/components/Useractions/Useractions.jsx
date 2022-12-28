/** @format */

import React, { useEffect } from "react";
import "./useractions.styles.scss";
import TimeAgo from "react-timeago";
import Slider from "../Slider/Slider";
import { backendApi } from "../../Api";
import { useState } from "react";
import PostDialogbox from "../PostDialogbox/PostDialogbox";
const Useractions = ({ item }) => {
  let imagelist = item.images.length > 0 && item.images;
  let parsedImage = imagelist && imagelist.map((el) => JSON.parse(el));
  const [postData, setPostData] = useState({});
  const [postDialog, setPostDialog] = useState({
    state: "",
    data: [],
  });

  useEffect(() => {
    fetchPostDetails(item.id);
  }, [item.id]);

  const fetchPostDetails = async (id) => {
    const { data } = await backendApi.get("/post/" + item.id);
    setPostData(data);
  };
  const handlePostdialog = (state, items) => {
    console.log(item);
    setPostDialog({
      state: state,
      data: items,
    });
  };
  return (
    <div className="useraction-wrapper">
      {postDialog.state && (
        <PostDialogbox
          item={postDialog.data}
          postDialog={postDialog}
          setPostDialog={setPostDialog}
        />
      )}
      <div className="useraction-contents">
        <h2>{postData.title}</h2>
        <div className="useraction-imagewrapper">
          <Slider images={parsedImage} />
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
          Posted <TimeAgo date={new Date(postData.created_at)} />
        </div>
      </div>
    </div>
  );
};

export default Useractions;
