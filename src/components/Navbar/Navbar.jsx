/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.styles.scss";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [dropDownState, setDropdownState] = useState(false);
  const userData = useSelector((state) => state.user);

  return (
    <div className="nav">
      <div className="nav-left"></div>
      <div className="nav-right">
        <div className="profile-nav">
          <div
            className="profile-img-wrapper"
            onClick={() => setDropdownState(!dropDownState)}>
            <Avatar
              src={userData ? userData.url : ""}
              alt="text"
              sx={{ width: 24, height: 24 }}
            />
            <span className="profile-name">
              {userData ? userData.username : ""}{" "}
            </span>
            <ArrowDropDownIcon className="profile-img-arrow" />
          </div>

          <div
            className={
              dropDownState
                ? "profile-dropdown profile-dropdown_active"
                : "profile-dropdown"
            }>
            <ul>
              <li>
                <Link to="/create/post">
                  <AddIcon className="dropdown-list_icon" /> Create post
                </Link>
              </li>
              <li>
                <Link to="">
                  <SettingsIcon className="dropdown-list_icon" /> Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  onClick={() => setDropdownState(!dropDownState)}>
                  <LoginIcon className="dropdown-list_icon" /> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
