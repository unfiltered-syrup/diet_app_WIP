import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';

interface UserProps {
  userData: any;
}

const UserPage = (props: UserProps) => {
    const [loggedIn, setLoggedIn] = useState<string | null>(localStorage.getItem('loggedIn'));
    const [localUserData, setUserData] = useState<any>(props.userData);
    console.log(localUserData)
    return <>
    <h1 className='absolute font-UI text-3xl w-full left-1/4 m-10'>Your Info:</h1>
    <div className='flex grid-cols-2 gap-20 m-auto'>
    <div>Username: {localUserData.username}</div>
    <div>Email: {localUserData.email}</div>
    <div>Password: {localUserData.password}</div>
    </div>
    
    
    </>
  };
  
  export default UserPage;