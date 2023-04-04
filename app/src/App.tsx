import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { LocationState } from 'history';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import './css/mainUI.css';
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
  function sendUserData(userInfo: any){
    let d = Cookies.get('userdata');
    
    if(d==undefined){
      console.log('userData is undefined');
    }
    else{
      //following two lines are problematic and is a temperary workaround
      //Cookies are sometimes corrupted with a blacklash followed by a 054, which is 
      //unicode for comma.
      d = d.replaceAll('\\054', ',');
      d = d.replaceAll('\\', '');
      console.log(d);
      console.log('userData: ' + JSON.parse(d));
      return JSON.parse(d);
    }
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
          <div className={'w-32 h-screen hover:w-128 transition-all duration-300 ease-in-out bg-dark-green grid grid-cols-1'}>
          <ul className={'place-self-center w-full grid grid-cols-1 place-items-center'}>
          <li className={'w-full flex justify-center items-center'}>
            <Link to="/" className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <FontAwesomeIcon
                icon={icon({ name: 'house', family: 'sharp', style: 'light' })}
                size="3x"
                color="pink"
                className="transition-transform group-hover:-translate-x-16"
              />
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                Home
              </span>
            </Link>
          </li>
          {(loggedIn== 'false' || loggedIn=='False' || loggedIn===undefined) && <li className={'w-full flex justify-center items-center'}>
            <Link to="/login" className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <FontAwesomeIcon
                icon={icon({ name: 'arrow-right-to-arc', family: 'sharp', style: 'light' })}
                size="3x"
                color="pink"
                className="transition-transform group-hover:-translate-x-16"
              />
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                Login
              </span>
            </Link>
          </li>
          }
          {(loggedIn== 'true' || loggedIn=='True' || loggedIn===undefined) && <li className={'w-full flex justify-center items-center'}>
            <div className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <LogoutButton onLogout={handleLogin}/>
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                Logout
              </span>
            </div>
          </li>
          }
          {(loggedIn== 'true' || loggedIn=='True') && <li className={'w-full flex justify-center items-center'}>
            <Link to="/data" className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <FontAwesomeIcon
                icon={icon({ name: 'chart-mixed', family: 'sharp', style: 'light' })}
                size="3x"
                color="pink"
                className="transition-transform group-hover:-translate-x-16"
              />
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                Data
              </span>
            </Link>
          </li>
          }
          {(loggedIn== 'false' || loggedIn=='False' || loggedIn===undefined) && <li className={'w-full flex justify-center items-center'}>
            <Link to="/register" className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <FontAwesomeIcon
                icon={icon({ name: 'user-plus', family: 'sharp', style: 'light' })}
                size="3x"
                color="pink"
                className="transition-transform group-hover:-translate-x-16"
              />
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                Register
              </span>
            </Link>
          </li>
          }
          {(loggedIn== 'true' || loggedIn=='True') && <li className={'w-full flex justify-center items-center'}>
            <Link to="/user" className='py-6 highlight group w-full relative inline-flex items-center justify-center'>
              <FontAwesomeIcon
                icon={icon({ name: 'circle-user', family: 'sharp', style: 'light' })}
                size="3x"
                color="pink"
                className="transition-transform group-hover:-translate-x-16"
              />
              <span className=" font-UI font-hairline text-3xl text-pink-100 opacity-0 md:opacity-0 md:inline-block ml-2 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-y-1/2">
                User
              </span>
            </Link>
          </li>
          }
          </ul>
        </div>
        <div className="text-2x1 font-semibold flex  h-screen w-screen">
          
          <Routes>
          <Route path="/">
              <Route index element={<Home />} />
              <Route path="/data" element={<DbTestComponent name="Jaden" />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
              <Route path="/register" element={<Register onReg={handleLogin}/>} />
              <Route path="user" element={<UserPage userData={sendUserData}/>} />
            </Route>
          </Routes>
          </div>
          </div>
        

    </BrowserRouter>
  );
}

export default App;
