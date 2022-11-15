/** @format */

import React, { useRef, useState } from "react";
import "./auth.styles.scss";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-hot-toast";
import Inputbar from "../../components/Inputbar/Inputbar";
import validator from "validator";
import { useDispatch } from "react-redux";
import CustomAvatar from "../../components/Avatar/Avatar";
import { createUserdata } from "../../store/userSlice";
import { CreateNewFile } from "../../firebase/upload";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [userdetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    cpassword: "",
    profileUrl: "",
  });

  const [userImage, setUserImage] = useState("");

  const [error, setError] = useState({
    type: "",
    status: "",
  });
  const inputRef = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const isEmail = validator.isEmail(userdetails.email);

    const checkusername = userdetails.username.length > 10;

    if (checkusername) {
      setError({
        type: "username",
        status: "username cannot be more than 10 character's",
      });
      inputRef.current.scrollIntoView({
        behavior: "smooth",
      });

      return toast.error("Name cannot be more than 10 character's");
    }

    if (!isEmail) {
      setError({
        type: "email",
        status: "Email is not valid",
      });
      inputRef.current.scrollIntoView({
        behavior: "smooth",
      });

      return toast.error("Email is not valid");
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

    const data = userdetails;

    if (userImage) {
      data.url = userImage;
      dispatch(createUserdata(data, navigate));
    } else {
      const file = userdetails.profileUrl;
      const uploadcallback = (url) => {
        data.url = url;
        dispatch(createUserdata(data, navigate));
      };
      CreateNewFile(file, file.name, "", "", uploadcallback);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-contents">
        <div className="auth-form">
          <div className="auth-form-header">
            <h2>Sign up</h2>
            <CustomAvatar
              imageRef={imageRef}
              username={userdetails?.username}
              url={userdetails?.profileUrl}
              setuserimage={setUserImage}
            />
          </div>
          <form onSubmit={onSubmit}>
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"username"}
              label={"Username"}
              type="text"
              setError={setError}
              inputRef={inputRef}
              errclass={error.type === "username" ? "input-err" : ""}
            />

            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"email"}
              label={"Email"}
              type="email"
              setError={setError}
              inputRef={inputRef}
              errclass={error.type === "email" ? "input-err" : ""}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"password"}
              label={"Password"}
              type="password"
              errclass={error.type === "password" ? "input-err" : ""}
              setError={setError}
              inputRef={inputRef}
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"cpassword"}
              label={"Confirm password"}
              type="password"
              errclass={error.type === "password" ? "input-err" : ""}
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
              imageRef={imageRef}
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
