/** @format */

import React, { useState } from "react";
import "./auth.styles.scss";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-hot-toast";
import Inputbar from "../../components/Inputbar/Inputbar";
const Auth = () => {
  const [userdetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    cpassword: "",
  });
  const [error, setError] = useState({
    type: "",
    status: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    if (userdetails.password !== userdetails.cpassword) {
      setError({
        type: "password",
        status: "password doesn't match",
      });
      toast.error("Passwords doesn't match");
    }
  };
  console.log(userdetails);
  return (
    <div className="auth-container">
      <div className="auth-contents">
        <div className="auth-form">
          <h2>Sign up</h2>
          <form onSubmit={onSubmit}>
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"username"}
              label={"Username"}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"email"}
              label={"Email"}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"password"}
              label={"Password"}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"cpassword"}
              label={"Confirm password"}
            />

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
