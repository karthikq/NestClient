/** @format */

import "./App.css";
import React from "react";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Create from "./pages/Create/Create";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <Router>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/post" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
