/** @format */
import React from "react";
import { Link } from "react-router-dom";
import "./nav.styles.scss";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-left"></div>
      <div className="nav-right">
        <div className="profile-nav">
          <img src="" alt="" />
          <div className="profile-dropdown">
            <ul>
              <li>
                <Link to="/create/post"> Create post</Link>
              </li>
              <li>
                <Link to="">Settings</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
