/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthorStatus from "../../components/AuthorStatus/AuthorStatus";
import HomeUser from "../../components/HomeUser/HomeUser";

import Posts from "../../components/posts/posts";
import { fetchposts } from "../../store/postsSlice";

import "./home.styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.posts);
  const { user } = useSelector((state) => state?.user);
  useEffect(() => {
    fetchPosts();
  }, [window.location]);
  const fetchPosts = async () => {
    try {
      await dispatch(fetchposts());
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
            sortedArr.map((item) => (
              <Posts item={item} key={item.id} user={user && user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
