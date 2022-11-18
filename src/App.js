/** @format */

import "./App.css";
import React from "react";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Create from "./pages/Create/Create";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create/post" element={<Create />} />
          <Route path="/auth/login" element={<Auth state={true} />} />
          <Route path="/auth/register" element={<Auth state={false} />} />
        </Routes>
        <Toaster />
      </Router>
    </Provider>
  );
}

export default App;
