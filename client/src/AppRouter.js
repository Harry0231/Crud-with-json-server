import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Add from "./Add";
import Edit from "./Edit";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer } from "react-toastify";
import Profile from "./Profile";
import "./App.css";

import Appheader from "./Appheader";
const AppRouter = () => {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center"></ToastContainer>

      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<Add />} />
          <Route path="/update/:id" element={<Edit />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default AppRouter;
