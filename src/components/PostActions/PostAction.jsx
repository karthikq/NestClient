/** @format */

import React from "react";
import "./postaction.styles.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deletePostReducer } from "../../store/postsSlice";
import { toast } from "react-hot-toast";
import { Backdrop } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { useNavigate } from "react-router-dom";
const PostAction = ({
  post,
  setEditState,
  editState,
  handleUpload,
  submitState,
  setSubmitState,
  locationState,
  user,
}) => {
  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = useState(false);
  const navigation = useNavigate();

  const handleDelete = (postId) => {
    setDeleteState(true);
    toast(
      (t) => (
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem 0",
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Do you want to delete this Post ?
          <div style={{ margin: "0 auto" }}>
            <button
              onClick={() => {
                dispatch(deletePostReducer(postId));
                setDeleteState(false);
                toast.dismiss(t.id);
                setTimeout(() => {
                  toast.success("Post deleted");
                }, 500);
              }}
              style={{
                background: "black",
                color: "white",
                padding: "0.3rem 0.5rem",
                borderRadius: 5,
                border: 0,
                cursor: "pointer",
                marginTop: 12,
                width: 45,
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setDeleteState(false);
              }}
              style={{
                background: "red",
                color: "white",
                padding: "0.3rem 0.5rem",
                borderRadius: 5,
                border: 0,
                cursor: "pointer",
                width: 45,
                marginLeft: 8,
              }}
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: "6000",
        position: "top-center",
      }
    );
  };

  return (
    <div className="post-edit-wrapper">
      <Backdrop
        open={deleteState}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      ></Backdrop>
      {locationState?.value && (
        <div id={post.postId + "post"} className="post-back-wrapper">
          <ReplyAllIcon
            titleAccess="Go back"
            onClick={() =>
              navigation(
                locationState.value +
                  "?postId=" +
                  locationState?.postId +
                  locationState.hash
              )
            }
            className="post-deleteicon post-action-icon post-back"
          />
        </div>
      )}
      {user.userId === post.user?.userId && (
        <>
          {editState && (
            <FileUploadIcon
              titleAccess="upload changes"
              className={
                submitState
                  ? "post-editicon post-action-icon post-upload-icon btn-disable"
                  : "post-editicon post-action-icon post-upload-icon"
              }
              onClick={() => handleUpload()}
            />
          )}
          {editState ? (
            <CloseIcon
              className="post-editicon post-action-icon"
              titleAccess="Cancel Edit"
              onClick={() => {
                setEditState(false);
                setSubmitState(false);
              }}
            />
          ) : (
            <EditIcon
              className="post-editicon post-action-icon"
              titleAccess="Edit Post"
              onClick={() => setEditState(true)}
            />
          )}
          <DeleteOutlineIcon
            titleAccess="Delete Post"
            onClick={() => handleDelete(post.postId)}
            className="post-deleteicon post-action-icon"
          />
        </>
      )}
    </div>
  );
};

export default PostAction;
