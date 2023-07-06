import React, { useState, useEffect } from 'react';
import Display_recipes from './Display_recipes';
import './componentCSS/Sliding_box.css';

function Sliding_box() {
    const [isOpen, setIsOpen] = useState(false);
    const [recipeImg, setRecipeImg] = useState('');

    const toggleBox = (recipeName: any) => {
        if (isOpen && recipeImg === recipeName) {
            // If the sliding box is already open with the same image, close it
            setIsOpen(false);
            setRecipeImg('');
        } else {
            // Otherwise, open the sliding box with the new image
            setIsOpen(true);
            setRecipeImg(recipeName);
        }
    };

    const boxClass = isOpen ? 'box open' : 'box';
    const backBoxClass = isOpen ? 'backbox expand' : 'backbox';

    return (
        <>
            <div className={backBoxClass + ' flex justify-center items-center mr-0 p-0'}>
                {isOpen && <img src={recipeImg} className="mr-24" style={{ maxHeight: '50vh', maxWidth: '50vw' }} />}
            </div>
            <div id="dropdown" className={boxClass}>
                {isOpen ? (
                    <div>
                        <Display_recipes toggleBox={toggleBox} />
                    </div>
                ) : (
                    <div className="bg-green">
                        <Display_recipes toggleBox={toggleBox} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Sliding_box;
