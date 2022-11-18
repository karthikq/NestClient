/** @format */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.styles.scss";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserData } from "../../store/userSlice";
import listenForOutsideClicks from "./listenForOutsideClicks";

const Navbar = () => {
  const [dropDownState, setDropdownState] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setDropdownState)
  );
  return (
    <div ref={menuRef} className="nav">
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
                <Link
                  to="/create/post"
                  onClick={() => setDropdownState(!dropDownState)}>
                  <AddIcon className="dropdown-list_icon" /> Create post
                </Link>
              </li>
              <li>
                <Link to="" onClick={() => setDropdownState(!dropDownState)}>
                  <SettingsIcon className="dropdown-list_icon" /> Settings
                </Link>
              </li>
              <li>
                {!userData.username ? (
                  <Link
                    to="/auth/login"
                    onClick={() => setDropdownState(!dropDownState)}>
                    <LoginIcon className="dropdown-list_icon" /> Login
                  </Link>
                ) : (
                  <Link
                    to="/"
                    onClick={() => {
                      setDropdownState(!dropDownState);
                      dispatch(logoutUserData());
                    }}>
                    <LoginIcon className="dropdown-list_icon" /> Logout
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
