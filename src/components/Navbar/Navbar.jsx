/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.styles.scss";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const [dropDownState, setDropdownState] = useState(false);
  return (
    <div className="nav">
      <div className="nav-left"></div>
      <div className="nav-right">
        <div className="profile-nav">
          <div
            className="profile-img-wrapper"
            onClick={() => setDropdownState(!dropDownState)}>
            <Avatar src="" alt="text" sx={{ width: 24, height: 24 }} />
            <span className="profile-name">Author name</span>
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
                <Link to="/auth/login">
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
