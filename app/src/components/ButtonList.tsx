import React, { useEffect, useState } from 'react';

interface ButtonListProps {
    buttons: string[];
    }

function ButtonList(props: ButtonListProps) {
    const [CuisinePref, setCuisinePref] = useState<string[]>([])
    const storePreference = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log(e.currentTarget.textContent);
    };

    const buttons = props.buttons.map((buttonText, index) => (
      <button onClick={storePreference} className=" w-1/12 my-4 mx-2 min-w-fit bg-light-green h-16 px-4 rounded-2xl shadow-md" key={index}>{buttonText}</button>
    ));
  
    return (
      <div className="w-full mx-14 my-5">
        {buttons}
      </div>
    );
  }

  export default ButtonList;