/** @format */

import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Usercontext, Usercontextobj } from "../context/Usercontext";
import "./homeuser.styles.scss";

const HomeUser = () => {
  const { user } = useSelector((state) => state.user);
  const selUser = useContext(Usercontextobj);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    console.log(selUser.val);
    if (selUser.val) {
      console.log("s");
      setUserDetails(selUser.val);
    } else {
      setUserDetails(user);
    }
  }, [selUser.val, user]);

  return (
    <div className="homeuser-container">
      <div className="homeuser-contents">
        <div className="homeuser-image">
          <div className="homeuser-bgimage">
            <img src={"https://picsum.photos/320/100"} alt="bgimage" />
          </div>
          <div className="homeuser-avatar">
            <Avatar
              src={userDetails.url}
              style={{
                width: 45,
                height: 45,
                borderRadius: 10,
                boxShadow: "0px 10px 20px rgb(0,0,0,0.15)",
              }}
            />
          </div>
        </div>
        <div className="homeuser-details">
          <p>{userDetails.username}</p>
          <span>@{userDetails.username}</span>
          <span> </span>
        </div>
        <div className="homeuser-follows">
          <div>
            <p>1000</p>
            <span>Following</span>
          </div>
          <div>
            <p>1000</p>
            <span>Following</span>
          </div>
        </div>
        <div className="homeuser-link">
          <Link to={"/user/" + userDetails.userId + "#post"}>User Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
