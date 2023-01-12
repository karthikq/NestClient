/** @format */
import React from "react";
import { useState } from "react";
import "./create.styles.scss";
const Create = () => {
  const [postData, setPostData] = useState({
    title: "",
    desp: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-container">
      <form onSubmit={onSubmit}>
        <label>title</label>
        <input
          type="text"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          placeholder="title"
        />
        <label>desp</label>
        <input
          type="text"
          onChange={(e) => setPostData({ ...postData, desp: e.target.value })}
          placeholder="description"
        />
        <button type="submit">Create post</button>
      </form>
    </div>
  );
};

export default Create;
