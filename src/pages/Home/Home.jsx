/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import { backendApi } from "../../Api";
import AuthorStatus from "../../components/AuthorStatus/AuthorStatus";
import HomeUser from "../../components/HomeUser/HomeUser";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../../components/posts/posts";
import "./home.styles.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const { data } = await backendApi.get("/post/all");
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home-container">
      <div className="home-user_details">
        <HomeUser />
      </div>
      <div className="home-center">
        <div className="home-author-status">
          <AuthorStatus />
        </div>
        {posts?.posts?.map((item) => (
          <Posts item={item} key={item.id} />
        ))}
      </div>
      <div className="home-userdetails"></div>
    </div>
  );
};

export default Home;
