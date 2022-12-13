/** @format */

import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  LinearProgress,
  List,
} from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../CustomDialog/CustomDialog";
import Uploaditems from "../UploadItems/Uploaditems";
import "./authorstatus.styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { CreateNewFile } from "../../firebase/upload";
import toast from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostdata, fetchposts } from "../../store/postsSlice";
import CustomrLottie from "../Lottie/Lottie";
import ErrorIcon from "@mui/icons-material/Error";

const AuthorStatus = () => {
  const [openDialogbox, setOpenDialogBox] = useState({
    state: false,
    type: "",
  });
  const [userstatus, setUserStatus] = useState("");
  const [contentErr, setContentErr] = useState(false);
  const [activeClose, setactiveClose] = useState(true);
  const [backdropstate, setBackdropstate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(({ user }) => user.user);
  const [items, setItems] = useState({
    files: [],
    urls: [],
    names: [],
  });

  const handleRemove = (itemIndex) => {
    const newFiles = items.files.filter((item, index) => index !== itemIndex);
    const newUrls = items.urls.filter((item, index) => index !== itemIndex);
    const newNames = items.names.filter((item, index) => index !== itemIndex);

    setItems({
      files: newFiles,
      urls: newUrls,
      names: newNames,
    });
    console.log(items);
  };

  const handleCallback = (val) => {
    if (val > 100) {
      setProgress(0);
      setBuffer(10);
    } else {
      setProgress(val);
      setBuffer(val + 10);
    }
  };
  const callback = (url, name) => {
    setUploadedUrl((prevalue) => [...prevalue, { name, url }]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!userData.userId) {
      return toast(
        (t) => (
          <span>
            Please login to continue
            <a href="/auth/login">
              <button className="toast-btn" onClick={() => toast.dismiss(t.id)}>
                Click here
              </button>
            </a>
          </span>
        ),
        {
          icon: (
            <ErrorIcon
              style={{ color: "#5814d6", position: "relative", left: 3 }}
            />
          ),
        }
      );
    }
    if (!userstatus) {
      return setContentErr(true);
    } else {
      toast.loading("Creating post");
      setBackdropstate(true);
      setactiveClose(false);
      items.names.map(async (item, index) => {
        await CreateNewFile(
          items.files[index],
          item,
          index,
          handleCallback,
          callback,
          true
        );
      });
    }
  };

  useEffect(() => {
    if (
      uploadedUrl?.length !== 0 &&
      uploadedUrl?.length === items?.files?.length
    ) {
      setBackdropstate(false);
      toast.dismiss();
      const data = {
        title: userstatus,
        desp: "qweqw eqweq weqwe qwewqe",
        images: uploadedUrl,
      };
      dispatch(createPostdata(data));
      setItems({
        files: [],
        items: [],
        names: [],
      });
      setUserStatus("");
      toast.success("Post created");
    }
  }, [uploadedUrl, items]);
  return (
    <div className="author-status-wrapper">
      {backdropstate && (
        <div className="create-post-lottie">
          <CustomrLottie />
        </div>
      )}
      <Backdrop
        open={backdropstate}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        className={
          contentErr && userstatus.length === 0
            ? "author-status-contents author-no-status"
            : "author-status-contents"
        }>
        <Avatar src={userData?.url ? userData.url : ""} />
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={userstatus}
            maxLength={50}
            placeholder="Whats happening?"
            onChange={(e) => setUserStatus(e.target.value)}
          />
          <div className="send-icon-wrapper">
            <button type="submit">
              <SendIcon className="send-icon" />
            </button>
          </div>
        </form>
      </div>
      {contentErr && userstatus.length === 0 && (
        <span className="error-content">Please add some content here</span>
      )}
      {items.files.length < 3 && (
        <Uploaditems open={openDialogbox} setOpen={setOpenDialogBox} />
      )}
      {openDialogbox.state && (
        <CustomDialog
          setOpen={setOpenDialogBox}
          open={openDialogbox}
          setItems={setItems}
        />
      )}
      {items.names.length !== 0 && (
        <p className="upload-item-status">
          {activeClose
            ? " You can upload upto 3 files."
            : "Uploading please wait..."}
        </p>
      )}
      <div className="uploaded-items-wrapper">
        {items?.names?.map((item, index) => (
          <div className="uploaded-item ">
            <div className="upload-progress-status"></div>
            <div className="uploaded-checkicon">
              <img src="https://i.ibb.co/9YWkXTT/accept.png" alt="tickmark" />
            </div>
            <img className="uploaded-img" src={items?.urls[index]} alt="err" />
            <div className="uploaded-item-details">
              {activeClose && (
                <CloseIcon
                  className="cancel-upload-icon"
                  onClick={() => handleRemove(index)}
                />
              )}
              <p>{item.substring(0, 18)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorStatus;
