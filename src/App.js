/** @format */

import "./App.css";
import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Create from "./pages/Create/Create";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

import Auth from "./pages/Auth/Auth";
import User from "./pages/User/User";
import { useDispatch } from "react-redux";
import { getUserData } from "./store/userSlice";
import { querystring } from "@firebase/util";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    await dispatch(getUserData());

    const { token } = querystring.parse(window.location.search);
    if (token) {
      localStorage.setItem("authtoken", token);
      window.history.pushState({}, "", "/");
      await dispatch(getUserData());
    }
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/user/:id" element={<User />} />
        <Route path="/create/post" element={<Create />} />
        <Route path="/auth/login" element={<Auth state={true} />} />
        <Route path="/auth/register" element={<Auth state={false} />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
