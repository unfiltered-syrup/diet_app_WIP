import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { LocationState } from 'history';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

//import LoginPage from "./LoginPage"
import Home from "./components/Home";
import DbTestComponent from "./components/DbTestComponent";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import LoginPage from "./components/LoginPage";
import LogoutButton from "./components/LogoutButton";
import Register from "./components/Register";
import AppProps from './interfaces/AppProps';
import UserPage from './components/UserPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used



function App(props: AppProps) {
  function handleLogin(isLoggedIn: string | undefined) {
    console.log('Logged in:', isLoggedIn);
    setLoggedIn(Cookies.get('isLoggedIn'));
    console.log(loggedIn);
    // Do something with the logged-in state
  }
  var isLoggedIn: string | undefined = Cookies.get('isLoggedIn');
  const [loggedIn, setLoggedIn] = useState(Cookies.get('isLoggedIn'));
  useEffect(() => {
    setLoggedIn(Cookies.get('isLoggedIn'));
    console.log('useEffect: ' + loggedIn);
  }, [props.isLoggedIn]);
  const [isLoading, setLoading] = useState(false);
  const [endRefresh, setEndRefresh] = useState(false);


  console.log('----------------------------------');
  console.log("is loading: " + isLoading);
  console.log("is logged in: " + loggedIn);
  console.log("end refresh: " + endRefresh);
  console.log('----------------------------------');
  return (
      <BrowserRouter>
          <div className="flex bg-light-pink">
            <div className={'w-64 h-screen bg-dark-green grid grid-cols-1 place-items-center'}>
          <ul className={'place-self-center'}>
            <li className={'my-8'}>
              <Link to="/" >
                <FontAwesomeIcon icon={icon({name: 'house', family: 'sharp', style: 'light'})} size="3x"  color='pink'/>
              </Link>
            </li>
            {(loggedIn== 'false' || loggedIn=='False') && <li className={'my-8'}>
              <Link to="/login" >
                <FontAwesomeIcon icon={icon({name: 'arrow-right-to-arc', family: 'sharp', style: 'light'})} size="3x"  color='pink' />
              </Link>
            </li>}
            {loggedIn== 'true' || loggedIn=='True' && <li className={'my-8'}>
              <LogoutButton onLogout={handleLogin}/>
            </li>}
            {loggedIn== 'true' || loggedIn=='True' && <li className={'my-8'}>
              <Link to="/api/data" >
                <FontAwesomeIcon icon={icon({name: 'chart-mixed', family: 'sharp', style: 'light'})} size="3x"  color='pink'/>
              </Link>
            </li>}
            {loggedIn== 'false' || loggedIn=='False' && <li className={'my-8'}>
              <Link to="/api/register" >
                <FontAwesomeIcon icon={icon({name: 'user-plus', family: 'sharp', style: 'light'})} size="3x" color='pink'/>
              </Link>
            </li>}
            {loggedIn== 'true' || loggedIn=='True' && <li className={'my-8'}>
              <Link to="/user" >
                <FontAwesomeIcon icon={icon({name: 'circle-user', family: 'sharp', style: 'light'})} size="3x"  color='pink'/>
              </Link>
            </li>}
          </ul>
        </div>
        <div className="text-2x1 font-semibold flex items-center justify-center h-screen w-screen">
        <div className='flex w-1/2 h-1/3 mx-auto justify-center border-4 border-solid border-light-green bg-light-green'>
          <div className='m-auto'>
          <Routes>
          <Route path="/">
              <Route index element={<Home />} />
              <Route path="api/data" element={<DbTestComponent name="Jaden" />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
              <Route path="api/register" element={<Register />} />
              <Route path="user" element={<UserPage />} />
            </Route>
          </Routes>
          </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
