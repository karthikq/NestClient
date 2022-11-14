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
    cpassword: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userdetails);
  };
  return (
    <div className="auth-container">
      <div className="auth-contents">
        <div className="auth-form">
          <h2>Sign up</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="username"
                onChange={(e) =>
                  setUserDetails({ ...userdetails, username: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                placeholder="email"
                onChange={(e) =>
                  setUserDetails({ ...userdetails, email: e.target.value })
                }
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="text"
                placeholder="password"
                onChange={(e) =>
                  setUserDetails({ ...userdetails, password: e.target.value })
                }
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="text"
                placeholder="Confirm password"
                onChange={(e) =>
                  setUserDetails({ ...userdetails, cpassword: e.target.value })
                }
              />
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
