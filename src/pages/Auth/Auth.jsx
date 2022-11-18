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
import { createUserdata, loginuserdata } from "../../store/userSlice";
import { CreateNewFile } from "../../firebase/upload";
import { Link, useNavigate } from "react-router-dom";
import CustomrLottie from "../../components/Lottie/Lottie";
const Auth = ({ state }) => {
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
  const [loaderState, setLoaderstate] = useState(false);
  const [backendError, setBackendError] = useState([]);
  const inputRef = useRef();
  const imageRef = useRef();
  const errDiv = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Callback = (val) => {
    if (val === -1) {
      navigate("/");
    } else {
      setBackendError([val]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setLoaderstate(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isEmail = validator.isEmail(userdetails.email);
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
    if (state) {
      setLoaderstate(true);
      dispatch(loginuserdata(userdetails, Callback));
    } else {
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

      if (userdetails.password !== userdetails.cpassword) {
        setError({
          type: "password",
          status: "password doesn't match",
        });
        inputRef.current.scrollIntoView({
          behavior: "smooth",
        });

        toast.error("Passwords doesn't match");
      }

      const data = userdetails;

      if (userImage) {
        data.url = userImage;
        dispatch(createUserdata(data, Callback));
      } else {
        const file = userdetails.profileUrl;
        setLoaderstate(true);
        const uploadcallback = (url) => {
          data.url = url;
          dispatch(createUserdata(data, Callback));
        };
        CreateNewFile(file, file.name, "", "", uploadcallback);
      }
    }
  };

  console.log(backendError);
  return (
    <div className="auth-container">
      {loaderState && (
        <div className="loader-wrapper">
          <CustomrLottie />
        </div>
      )}
      <div className="auth-contents">
        <div className="auth-form">
          <div className="auth-form-header">
            <h2>{state ? "Sign In" : "Sign up"}</h2>
            {!state && (
              <CustomAvatar
                imageRef={imageRef}
                username={userdetails?.username}
                url={userdetails?.profileUrl}
                setuserimage={setUserImage}
              />
            )}
          </div>
          {backendError.length !== 0 && (
            <div ref={errDiv} className="errors-list">
              {backendError?.map((err) =>
                err?.message?.length > 0 ? (
                  err.message?.map((messages) => <span>{"* " + messages}</span>)
                ) : (
                  <span>{"* " + err.message}</span>
                )
              )}
            </div>
          )}
          <form onSubmit={onSubmit}>
            {!state && (
              <Inputbar
                setUserDetails={setUserDetails}
                userdetails={userdetails}
                name={"username"}
                label={"Username"}
                type="text"
                setError={setError}
                setBackendError={setBackendError}
                inputRef={inputRef}
                errclass={
                  error.type === "username" ||
                  (backendError.length !== 0 &&
                    backendError?.map((err) =>
                      err?.message?.length > 0
                        ? err.message?.find((messages) =>
                            messages.includes("username")
                          )
                        : err?.message?.includes("username")
                    ))
                    ? "input-err"
                    : ""
                }
              />
            )}
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"email"}
              label={"Email"}
              type="email"
              setError={setError}
              inputRef={inputRef}
              setBackendError={setBackendError}
              errclass={
                error.type === "email" ||
                (backendError.length !== 0 &&
                  backendError?.map((err) =>
                    err?.message?.length > 0
                      ? err.message?.find((messages) =>
                          messages.includes("email")
                        )
                      : err?.message?.includes("email")
                  ))
                  ? "input-err"
                  : ""
              }
            />
            <Inputbar
              setUserDetails={setUserDetails}
              userdetails={userdetails}
              name={"password"}
              label={"Password"}
              setBackendError={setBackendError}
              type="password"
              errclass={
                error.type === "password" ||
                (backendError.length !== 0 &&
                  backendError?.map((err) =>
                    err?.message?.length > 0
                      ? err.message?.find((messages) =>
                          messages.includes("password")
                        )
                      : err?.message?.includes("password")
                  ))
                  ? "input-err"
                  : ""
              }
              setError={setError}
              inputRef={inputRef}
            />
            {!state && (
              <Inputbar
                setUserDetails={setUserDetails}
                userdetails={userdetails}
                name={"cpassword"}
                setBackendError={setBackendError}
                label={"Confirm password"}
                type="password"
                errclass={error.type === "password" ? "input-err" : ""}
                setError={setError}
                inputRef={inputRef}
              />
            )}
            {!state && (
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
            )}
            <div className="auth-btn-wrapper">
              <button>Submit</button>
            </div>
          </form>
          <div className="no-account">
            {!state ? (
              <span>
                Have an account <Link to="/auth/login">login</Link>
              </span>
            ) : (
              <span>
                Don't have account <Link to="/auth/register">Register</Link>
              </span>
            )}
          </div>

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
