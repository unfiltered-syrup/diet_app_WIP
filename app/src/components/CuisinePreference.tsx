import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes ,Route, Link, useLocation } from 'react-router-dom';
import CuisineButton from './UIButtons/CuisineButton';
import ButtonList from './ButtonList';
import '../css/mainUI.css';

const CuisinePreference = () => {
    const [cuisineList, setCuisineList] = useState([]);
    const [dietList, setDietList] = useState<string[]>([]);
    const [proteinList, setProteinList] = useState<string[]>([]);
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
    const fetch_diet_list = () =>{
        //fetch a list of all cuisines and display them using cuisine_buttons component 
        setDietList(['diet1','diet2','diet3','diet4','diet5', 'diet6', 'diet7', 'diet8', 'diet9', 'diet10',
        'diet11', 'diet12', 'diet13', 'diet14', 'diet15', 'diet16', 'diet17', 'diet18', 'diet19', 'diet20',])
    }

    const fetch_protein_list = () =>{
        setProteinList(['Pork', 'Beef', 'Chicken', 'Duck', 'Fish', 'Egg', 'Tofu', 'Lamb', 'Plant-based'])
    }

    function store_preference(){

    }
    useEffect(() => {
        fetch_cuisine_list();
        fetch_diet_list();
        fetch_protein_list();
    }, []);

    if(isLoading==true){
        return <div>Loading...</div>
    }
    else{
        return <>
        <h1 className="font-UI text-2xl p-3 px-10 py-10 ">Choose Your Cuisine Preferences</h1>
         <div className="flex max-h-[500px] overflow-y-auto mx-10 bg-white bg-opacity-20 shadow-lg rounded-2xl">
            <ButtonList buttons={cuisineList} />
        </div>
        <h1 className="font-UI text-2xl p-3 px-10 py-10 ">Choose Your Diet Preferences</h1>
        <div className="flex max-h-[500px] overflow-y-auto mx-10 bg-white bg-opacity-20 shadow-lg rounded-2xl">
            <ButtonList buttons={dietList} />
        </div>
        <h1 className="font-UI text-2xl p-3 px-10 py-10 ">Choose Your Protein Preferences</h1>
        <div className="flex max-h-[500px] overflow-y-auto mx-10 bg-white bg-opacity-20 shadow-lg rounded-2xl">
            <ButtonList buttons={proteinList} />
        </div>
        </>
  };
}
  


  export default CuisinePreference;