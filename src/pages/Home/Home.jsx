/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../../Api";
import AuthorStatus from "../../components/AuthorStatus/AuthorStatus";
import HomeUser from "../../components/HomeUser/HomeUser";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/posts/posts";
import { fetchposts } from "../../store/postsSlice";
import { getUserData } from "../../store/userSlice";
import "./home.styles.scss";
import queryString from "query-string";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.posts);
  useEffect(() => {
    fetchPosts();
  }, [window.location]);
  const fetchPosts = async () => {
    try {
      await dispatch(fetchposts());

      await dispatch(getUserData());

      const { token } = queryString.parse(window.location.search);
      if (token) {
        localStorage.setItem("authtoken", token);
        window.history.pushState({}, "", "/");
        await dispatch(getUserData());
      }
    } catch (error) {
      console.log(error);
    }
  };
  let sortedArr =
    data &&
    [...data].sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <div className="home-container">
      <div className="home-user_details">
        <HomeUser />
      </div>
      <div className="home-center">
        <div className="home-center-contents">
          <div className="home-author-status">
            <AuthorStatus />
          </div>
          {sortedArr.length !== 0 &&
            sortedArr.map((item) => <Posts item={item} key={item.id} />)}
        </div>
      </div>
      <div className="home-userdetails"></div>
    </div>
  );
};

export default Home;
