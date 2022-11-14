/** @format */

import React, { useState } from "react";
import "./auth.styles.scss";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const Auth = () => {
  const [userdetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  return (
    <div className="auth-container">
      <div className="auth-contents">
        <div className="auth-form">
          <h2>Sign up</h2>
          <form>
            <div>
              <label>Username</label>
              <input type="text" placeholder="email" />
            </div>
            <div>
              <label>Email</label>
              <input type="text" placeholder="email" />
            </div>
            <div>
              <label>Password</label>
              <input type="text" placeholder="password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="text" placeholder="Confirm password" />
            </div>
            <div className="auth-btn-wrapper">
              <button>Submit</button>
            </div>
          </form>{" "}
          <div className="social-logins">
            <span>Or</span>
            <span>Continue with </span>
            <div className="social-item">
              <GoogleIcon className="social-icon" />
              <GitHubIcon className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
