import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import CuisineButton from './UIButtons/CuisineButton';

const CuisinePreference = () => {
    const [cuisineList, setCuisineList] = useState([]);
    function fetch_cuisine_list(){
        //fetch a list of all cuisines and display them using cuisine_buttons component 
        fetch('http://localhost:5000/api/cuisine_list', {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }
    function store_preference(){

    }

    const cuisineTypes = fetch_cuisine_list();
    console.log('cuisineTypes: '+ cuisineTypes);



    return <div>



    </div>;
  };
  
  export default CuisinePreference;