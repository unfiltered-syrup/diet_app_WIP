import React, { useState, useEffect } from 'react';
import Display_recipes from './Display_recipes';
import './componentCSS/Sliding_box.css'; //component css stroed in componentCSS folder

function Sliding_box (){
    const [isOpen, setIsOpen] = useState(false);
    const [recipeImg, setRecipeImg] = useState()
    //toggleBox is passed to a child component "Display_recipes", it is called within its child
    const toggleBox = (recipeName: any) => { 
        setIsOpen(!isOpen);
        //console.log('key clicked: '+ recipeName );
        console.log('is Open' + isOpen);
        setRecipeImg(recipeName);
        setTimeout(function () {
            window.scrollTo(0, 300);
        },2);
    }

    const boxClass = isOpen ? 'box open' : 'box'; //based on conditions 'isOpen', change css
    const backBoxClass = isOpen ? 'backbox expand' : 'backbox';
  
    return (<>
        <div className={backBoxClass + ' flex justify-center items-center mr-0 p-0'}>
        {isOpen 
            ? <img src={recipeImg} className='mr-24' style={{height: '50vh', width: '50vw'}}/> 
            : <img src={recipeImg} style={{height: '0vh', width: '0vw'}}/>
        }
        </div>    <div id="dropdown" className={boxClass}>
        {isOpen ? 
            <div> 
                <Display_recipes toggleBox={toggleBox} /> 
            </div> 
        : 
        <div className='bg-green'> 
            <Display_recipes toggleBox={toggleBox} />
        </div>
        }
        </div>
        </>
    );
  }
  
  export default Sliding_box;