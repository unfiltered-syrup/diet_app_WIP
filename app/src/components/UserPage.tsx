import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import CuisineButton from './UIButtons/CuisineButton';
interface UserProps {
  userData: any;
}




const UserPage = (props: UserProps) => {
    const [loggedIn, setLoggedIn] = useState<string | null>(localStorage.getItem('loggedIn'));
    const [localUserData, setUserData] = useState<any>(props.userData);
    console.log(localUserData)
    return <>
    <div className=' relative p-10 pl-20 w-full h-fit shadow-lg  bg-light-green'>
      <h1 className='font-UI text-5xl'>{localUserData.username}'s Dashboard</h1>
    </div>
    <div className="w-1/3 min-w-fit m-10">
      <div className='bg-light-white shadow-lg hover:shadow-2xl rounded-3xl'>
        <div className='flex flex-col'>
          <div className='flex m-10  w-full p-10'>
            <h1 className='font-UI text-3xl mr-30 my-auto'>Your Info:</h1>
            <div className=' ml-28 grid-cols-1 space-y-4 mt-10'>
              <div className='font-UI text-lg'>Username: {localUserData.username}</div>
              <div className='font-UI text-lg'>Email: {localUserData.email}</div>
              <div className='font-UI text-lg'>Password: {localUserData.password}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-light-white shadow-lg hover:shadow-2xl rounded-3xl'>
        <div className='flex m-10 w-full p-10'>
          <h1 className='font-UI text-3xl mr-20 my-auto'>Preferences:</h1>
          <div className='grid-cols-1 space-y-4 mt-10'>
            <div className=' font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white dark:focus:ring-light-green hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
            <Link to='../accountpreference' className='font-UI text-lg'>Change Account Information</Link>
          </div>
          <div className=' font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white dark:focus:ring-light-green hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
            <Link to='../dietpreference' className='font-UI text-lg'>Change Diet Preference </Link>
          </div>
          <div className=' font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white dark:focus:ring-light-green hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
            <Link to='../app-preference' className='font-UI text-lg'>Change App Settings</Link>
          </div>
          <CuisineButton cuisineName='Italian'/>
        </div>
      </div>
      
    </div>
  </div>
    
    

    </>
  };
  
  export default UserPage;