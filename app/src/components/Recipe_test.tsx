import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CuisineButton from "./UIButtons/CuisineButton";

interface RecipeProps {
  recipeData: any;
}

function Recipe_test () {
  const [localUserData, setUserData] = useState([]);
  console.log(localUserData);
  //fetch a list of all cuisines and display them using cuisine_buttons component
  useEffect(() => {
    // Effect code here (runs once)
  
    fetch("http://localhost:5000/api/generate_recommended_recipes", {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        if ((data.success = "True")) {
            console.log("recipes true");
            setUserData(data.data);
        } else {
            console.log("cant find recipes");
        }
        });
    }, []);

  return (
    <>
      <div className="w-1/3 min-w-fit m-10">
        <div className="bg-light-white shadow-lg hover:shadow-2xl rounded-3xl">
          <div className="flex flex-col">
            <div className="flex m-10  w-full p-10">
              <h1 className="font-UI text-3xl mr-30 my-auto">Your Info:</h1>
              <div className=" ml-28 grid-cols-1 space-y-4 mt-10">
                <div className="font-UI text-lg">recipes: </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe_test;