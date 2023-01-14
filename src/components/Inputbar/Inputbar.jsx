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
  imageRef,
  setBackendError,
}) => {
  const handleChange = (e) => {
    setError("");
    setBackendError([]);
    if (type === "file") {
      setUserDetails({ ...userdetails, [name]: e.target.files[0] });
      imageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      setUserDetails({ ...userdetails, [name]: e.target.value });
    }
  };
  return (
    <div ref={inputRef} className="auth-input">
      <label>{type === "file" ? label : label + " *"}</label>
      <input
        className={errclass}
        type={type}
        required={type === "file" ? false : true}
        placeholder={label.toLowerCase()}
        accept=".jpeg,.jpg,.png"
        onChange={handleChange}
      />{" "}
    </div>
  );
};

export default Inputbar;
