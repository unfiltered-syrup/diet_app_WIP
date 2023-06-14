import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import CuisineButton from './UIButtons/CuisineButton';
import PopupWindow from './PopupWindow';

interface UserProps {
    userData: any;
}

const UserPage = (props: UserProps) => {
    const [loggedIn, setLoggedIn] = useState<string | null>(localStorage.getItem('loggedIn'));
    const [localUserData, setUserData] = useState<any>(props.userData);

    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isPassModalVisible, setIsPassModalVisible] = useState(false);

    console.log(localUserData)
    const [localUserPreference, setUserPreference] = useState('');
    console.log(localUserData);

    const UsernameModal = () => {
        setIsUserModalVisible(!isUserModalVisible);
    };

    const PasswordModal = () => {
        setIsPassModalVisible(!isPassModalVisible);
    };

    fetch("http://localhost:5000/api/fetch_user_preference", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: localUserData.username }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success === "True") {
                console.log("fetch_user_preference_success");
                console.log(localUserPreference);
                setUserPreference(data.data);
            } else {
                console.log("can not find the user preference of the current user");
            }
        })
        .catch(error => {
            console.log(error)
        });

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
                        <div className='font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
                            <button
                                className='font-UI text-lg'
                                data-modal-target="UsernameModal"
                                data-modal-toggle="UsernameModal"
                                data-modal-show="UsernameModal"
                                type="button"
                                onClick={UsernameModal}>
                                Change Username
                            </button>
                        </div>
                        <div className='font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
                            <button
                                className='font-UI text-lg'
                                data-modal-target="PasswordModal"
                                data-modal-toggle="PasswordModal"
                                data-modal-show="PasswordModal"
                                type="button"
                                onClick={PasswordModal}>
                                Change Password
                            </button>
                        </div>
                        <div className=' font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
                            <Link to='../dietpreference' className='font-UI text-lg'>Change Diet Preference </Link>
                        </div>
                        <div className=' font-UI shadow-md text-gray-900 bg-gradient-to-r from-light-white to-light-green hover:bg-gradient-to-l hover:from-mid-green hover:to-light-white focus:ring-4 focus:outline-none focus:ring-light-white hover:shadow-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2'>
                            <Link to='../app-preference' className='font-UI text-lg'>Change App Settings</Link>
                        </div>
                        <CuisineButton cuisineName='Italian' />
                    </div>
                </div>
            </div>
        </div>
        <PopupWindow userName={localUserData.username} isVisible={isUserModalVisible} onClose={UsernameModal}>
            changeUsername
        </PopupWindow>
        <PopupWindow userName={localUserData.username} isVisible={isPassModalVisible} onClose={PasswordModal}>
            changePassword
        </PopupWindow>

    </>
};

export default UserPage;