import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom/client";

//holds message data
interface Message {
    sender: string | undefined;
    message: string | undefined;
}

function Chatbox(){
    const [convo, setConvo] = useState<Message[]>([]);
    const [newmsg, setNewsmg] = useState<Message>({sender: 'bot', message: 'first message'});
    fetch('/api/fetch_questions',{
        method: 'post',
        credentials: "include",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answers: ['yes', 'no']
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.quesion){
            setNewsmg({sender: 'bot', message: data.question})
        }
        else{
            setNewsmg({sender: 'bot', message: 'You are all set.'})
        }
    })

    return(
        <>
        <div className="flex flex-col h-screen p-6 bg-light-pink">
            <div className="flex flex-col mx-10 h-2/3 mb-4 p-3 bg-slate-50 bg-opacity-50 rounded-lg overflow-auto">
                <div className="mb-3 p-2 rounded-md bg-slate-200">
                <p>John: {newmsg.message} </p>
                </div>
                <div className="mb-3 p-2 rounded-md bg-green-200 text-right">
                <p>You: Hello John!</p>
                </div>

            </div>

            <div className="flex items-center mx-10 h-1/3 p-3 bg-slate-50 bg-opacity-50 rounded-lg">
                <button className="mr-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Button 1</button>
                <button className="mr-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Button 2</button>
                <button className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Button 3</button>
            </div>
            </div>
        </>
    )
}
export default Chatbox;