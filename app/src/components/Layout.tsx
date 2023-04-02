import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { LocationState } from 'history';
import LogoutButton from "./LogoutButton";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
const Layout = () => {
  const location = useLocation();
  var isLoggedIn: string | undefined = Cookies.get('isLoggedIn');
  useEffect(() => {
    isLoggedIn = Cookies.get('isLoggedIn');
  }, []);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [endRefresh, setEndRefresh] = useState(false);
  const handleLogout = async () => {
    setLoggedIn('false');
  }

  console.log('----------------------------------');
  console.log("is loading: " + isLoading);
  console.log("is logged in: " + loggedIn);
  console.log("end refresh: " + endRefresh);
  console.log('----------------------------------');
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <>
      <nav className="bg-green-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul>
            {isLoggedIn=='True' && <li>
              <Link to="/" >Home</Link>
            </li>}
            {isLoggedIn!='True' &&<li>
              <Link to="/login">Login</Link>
            </li>
            }
            {isLoggedIn=='True' && <li>
              <Link to="/api/data">Data</Link>
            </li>}
            {isLoggedIn=='True' &&<li>
              <Link to="/contact">Contact</Link>
            </li>}
            {isLoggedIn=='True' &&<li>
              <Link to="/api/register">Register</Link>
            </li>}
            {isLoggedIn=='True' &&<LogoutButton onLogout={handleLogout}/>}
          </ul>
        </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;