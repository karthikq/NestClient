/** @format */

import React, { useEffect } from "react";
import "./user.styles.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserbyId } from "../../store/userSlice";
const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchedUser = useSelector((state) => state.user.fetchedUser);
  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      await dispatch(getUserbyId(id));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(fetchedUser);
  return (
    <div className="user-container">
      <div className="user-contents">
        <div className="user-details">
          <div className="user-image-container">
            <div className="user-nav-wrapper">
              <div className="user-profile-img">
                <img src="" alt="err" />
              </div>
              <div className="user-nav">
                <ul>
                  <li>
                    <SettingsIcon className="user-nav-icon" />
                    Setting's
                  </li>
                  <li>
                    <FavoriteIcon className="user-nav-icon" /> Liked posts
                  </li>
                  <li>
                    <CommentIcon className="user-nav-icon" />
                    Comments
                  </li>
                </ul>
              </div>
            </div>{" "}
          </div>
          <div className="user-items">
            <div className="user-form">
              <form>
                <div className="user-form-item">
                  <label>Username</label>
                  <input type="text" placeholder="text" />
                </div>
                <div className="user-form-item">
                  <label>Email</label>
                  <input type="text" placeholder="text" />
                </div>
                <div className="user-form-item">
                  <label>Profile image</label>
                  <input type="file" />
                </div>
                <div className="user-form-item">
                  <span className="change-btn">Change image</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
