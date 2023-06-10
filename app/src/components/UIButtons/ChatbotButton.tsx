import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppProps from "../../interfaces/AppProps";

interface replyProps {
    content: string;
}

const ChatbotButton = (props: replyProps) => {
    const [reply, setReply] = useState("");
    const buttonPressed = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("button pressed");
        setReply(props.content);
        console.log(reply);
    }
    
    return <div>
        <button onClick={buttonPressed}>{props.content}</button>


    </div>;
  };
  
  export default ChatbotButton;