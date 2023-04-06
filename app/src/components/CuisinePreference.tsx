import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import CuisineButton from './UIButtons/CuisineButton';
import ButtonList from './ButtonList';


const CuisinePreference = () => {
    const [cuisineList, setCuisineList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetch_cuisine_list = () =>{
        //fetch a list of all cuisines and display them using cuisine_buttons component 
        fetch('http://localhost:5000/api/cuisinelist', {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsLoading(false);
                setCuisineList(data);
            });
    }
    function store_preference(){

    }
    useEffect(() => {
        fetch_cuisine_list();
    }, []);

    if(isLoading==true){
        return <div>Loading...</div>
    }
    else{
        return <div className="flex max-w-full">
            <ButtonList buttons={cuisineList} />
        </div>
  };
}
  


  export default CuisinePreference;