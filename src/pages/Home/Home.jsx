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
import "./home.styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.posts);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      await dispatch(fetchposts());
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
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
          {data?.map((item) => (
            <Posts item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="home-userdetails"></div>
    </div>
  );
};

export default Home;
