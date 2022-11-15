/** @format */
import React from "react";
import "./inputbar.styles.scss";

const Inputbar = ({
  setUserDetails,
  userdetails,
  name,
  label,
  type,
  errclass,
  setError,
  inputRef,
}) => {
  return (
    <div ref={inputRef} className="auth-input">
      <label>{type === "file" ? label : label + " *"}</label>
      <input
        className={errclass}
        type={type}
        placeholder={label.toLowerCase()}
        onChange={(e) => {
          setError("");
          type === "file"
            ? setUserDetails({ ...userdetails, [name]: e.target.files[0] })
            : setUserDetails({ ...userdetails, [name]: e.target.value });
        }}
      />{" "}
    </div>
  );
};

export default Inputbar;
