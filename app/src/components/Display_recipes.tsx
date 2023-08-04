import React, { useEffect, useState } from "react";

interface Recipe{
  name: string;
  id: number;
}

const Display_recipes = ({ toggleBox }: { toggleBox: (recipeName: string) => void }) => {
  const recipeArray = Array.from({ length: 15 }, (_, index) => `test${index + 1}`);
  const [recipeIds, setRecipeIds] = useState<Number[]>([]);
  const [recipeNames, setRecipeNames] = useState<String[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/get_recipe_id", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "True") {
          console.log("fetch ids success");
          // Set the recipe IDs (names) using the data from the server
          setRecipeNames(data.recipes.map((recipe: Recipe) => recipe.name));
          setRecipeIds(data.recipes.map((recipe: Recipe) => recipe.id))
          console.log(recipeIds)
        } else {
          console.log("error fetching ids");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
/*
  useEffect(() => {
    if (recipeIds.length > 0) {
      const fetchImages = async () => {
        const urls = await Promise.all(recipeIds.map(async (id: Number) => {
          const response = await fetch(`http://localhost:5000/api/get_image/${id}`);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return url;
        }));
        setImageUrls(urls);
      }
      fetchImages();
    }
  }, [recipeIds]);
  */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 bg-cornsilk p-10">
      {recipeIds.map((recipe, index) => (
        <div
          key={index}
          className="rounded bg-sage overflow-hidden shadow-sm transition duration-300 transform hover:shadow-lg hover:bg-olivine flex justify-center items-center my-5"
        >
          <img src={"http://localhost:5000/api/get_image/"+recipe} alt="Randomly generated image"></img>
        </div>
      ))}

      
    </div>
  );
};

export default Display_recipes;
