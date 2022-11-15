/** @format */

import React, { useRef, useState } from "react";
import "./auth.styles.scss";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-hot-toast";
import Inputbar from "../../components/Inputbar/Inputbar";
import validator from "validator";

import CustomAvatar from "../../components/Avatar/Avatar";
const Auth = () => {
  const [userdetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    cpassword: "",
    profileUrl: "",
  });
  const [error, setError] = useState({
    type: "",
    status: "",
  });
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const isEmail = validator.isEmail(userdetails.email);

    if (!isEmail) {
      setError({
        type: "email",
        status: "not a valid format",
      });
      return inputRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }

    if (userdetails.password !== userdetails.cpassword) {
      setError({
        type: "password",
        status: "password doesn't match",
      });
      inputRef.current.scrollIntoView({
        behavior: "smooth",
      });

      return toast.error("Passwords doesn't match");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-contents">
        <div className="auth-form">
          <div className="auth-form-header">
            <h2>Sign up</h2>
            <CustomAvatar
              username={userdetails?.username}
              url={userdetails?.profileUrl}
            />
          </div>
          <form onSubmit={onSubmit} noValidate>
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"username"}
              label={"Username"}
              type="text"
              setError={setError}
              inputRef={inputRef}
            />

            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"email"}
              label={"Email"}
              type="email"
              setError={setError}
              inputRef={inputRef}
              errclass={error.type === "email" && "input-err"}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"password"}
              label={"Password"}
              type="password"
              errclass={error.type === "password" && "input-err"}
              setError={setError}
              inputRef={inputRef}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"cpassword"}
              label={"Confirm password"}
              type="password"
              errclass={error.type === "password" && "input-err"}
              setError={setError}
              inputRef={inputRef}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"profileUrl"}
              label={"Porfile image"}
              type="file"
              setError={setError}
              inputRef={inputRef}
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
