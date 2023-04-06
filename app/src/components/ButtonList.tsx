import React from 'react';
interface ButtonListProps {
    buttons: string[];
    }

function ButtonList(props: ButtonListProps) {
    const buttons = props.buttons.map((buttonText, index) => (
      <button className=" w-1/12 my-4 mx-2 min-w-fit bg-light-green h-16" key={index}>{buttonText}</button>
    ));
  
    return (
      <div className="w-full mx-24 my-5">
        <h1 className="font-UI text-2xl my-10">Choose Your Cuisine Preference:</h1>
        {buttons}
      </div>
    );
  }

  export default ButtonList;