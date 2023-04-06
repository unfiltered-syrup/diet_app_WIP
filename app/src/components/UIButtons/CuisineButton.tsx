import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppProps from "../../interfaces/AppProps";

interface cusineProps {
    cuisineName: string;
}

const CuisineButton = (props: cusineProps) => {
    const [cuisineName, setName] = useState("");
    const buttonPressed = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("button pressed");
        setName(props.cuisineName);
        console.log(cuisineName);
    }
    
    return <div>
        <button onClick={buttonPressed}>{props.cuisineName}</button>


    </div>;
  };
  
  export default CuisineButton;