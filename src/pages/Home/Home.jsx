/** @format */

import React from "react";
import { useEffect } from "react";
import { backendApi } from "../../Api";
import Posts from "../../components/posts/posts";
import "./home.styles.scss";

const Home = () => {
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const { data } = await backendApi.get("/post/all");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home-container">
      <div className="home-posts">
        <Posts />
      </div>
      <div className="home-userdetails"></div>
    </div>
  );
};

export default Home;
