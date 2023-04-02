import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
//import LoginPage from "./LoginPage"
import Layout from "./components/Layout";
import Home from "./components/Home";
import DbTestComponent from "./components/DbTestComponent";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import Register from "./components/Register";

function App() {
  function handleLogin(isLoggedIn: boolean) {
    console.log('Logged in:', isLoggedIn);
    // Do something with the logged-in state
  }

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="api/data" element={<DbTestComponent name="Jaden" />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
              <Route path="api/register" element={<Register />} />
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
