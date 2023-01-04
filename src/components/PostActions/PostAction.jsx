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

const PostAction = ({
  post,
  setEditState,
  editState,
  handleUpload,
  submitState,
  setSubmitState,
}) => {
  const dispatch = useDispatch();
  const [deleteState, setDeleteState] = useState(false);
  const handleDelete = (postId) => {
    setDeleteState(true);
    toast(
      (t) => (
        <span>
          Do you want to delete this Post{" "}
          <button
            onClick={() => {
              dispatch(deletePostReducer(postId));
              setDeleteState(false);
              toast.dismiss(t.id);
            }}
            style={{
              marginLeft: 5,
              background: "black",
              color: "white",
              padding: "0.2rem 0.5rem",
              borderRadius: 5,
              border: 0,
              cursor: "pointer",
            }}
          >
            Yes
          </button>{" "}
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setDeleteState(false);
            }}
            style={{
              background: "red",
              color: "white",
              padding: "0.2rem 0.5rem",
              borderRadius: 5,
              border: 0,
              cursor: "pointer",
            }}
          >
            No
          </button>{" "}
        </span>
      ),
      {
        duration: 6000,
        position: "bottom-center",
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
    </div>
  );
};

export default PostAction;
