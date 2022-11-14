/** @format */
import React from "react";
import "./inputbar.styles.scss";

const Inputbar = ({ setUserDetails, userdetails, name, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        placeholder="username"
        onChange={(e) =>
          setUserDetails({ ...userdetails, [name]: e.target.value })
        }
      />
    </div>
  );
};

export default Inputbar;
