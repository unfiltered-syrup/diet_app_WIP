import React, { useState, useEffect } from 'react';
import img1 from './images/test1.jpg';
import img2 from './images/test2.jpg';
import img3 from './images/test3.jpg';
import img4 from './images/test4.jpg';
import img5 from './images/test5.jpg';
import img6 from './images/test6.jpg';
import img7 from './images/test7.jpg';
import img8 from './images/test8.jpg';
import img9 from './images/test9.jpg';
import img10 from './images/test10.jpg';
import img11 from './images/test11.jpg';
import img12 from './images/test12.jpg';
import img13 from './images/test13.jpg';
import img14 from './images/test14.jpg';
import img15 from './images/test15.jpg';

//sm: 640px
//md: 768px
//lg: 1024px
//xl: 1280px
//2xl: 1536px
const Display_recipes = ({toggleBox}: {toggleBox: (recipeName: string) => void}) => {
  const recipeArray = Array.from({ length: 31 }, (_, index) => `test${index}`);
  const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];
  const onRecipeClick = (recipeName: String) =>{
    console.log('key clicked: '+ recipeName );
  }

  return  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 bg-beige p-10">
    {recipeArray.map((recipe, index) => (
      <img key={index} src={imgs[index]} style={{ height: '250px', width: '250px' }} onClick={()=>toggleBox(imgs[index])} className='h-40 transition ease-in-out delay-150 hover:scale-105 duration-300 '/>
    ))}
</div>
}
export default Display_recipes;
