import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom/client";

//holds message data
function Chatbox(){
    const [question, setQuestion] = useState<string>("");
    const [questionId, setQuestionId] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const buttonPressed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonContent = (event.target as HTMLElement).innerText;
        setAnswer(buttonContent);
        sendAnswer();
        console.log(buttonContent);

    }

    const sendAnswer = () => {
        fetch('http://localhost:5000/api/get_response',{
            method: 'post',
            credentials: "include",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answer: answer,
                question_id: questionId,
            }),
            })
            .then(response => response.json())
            .then(data => {
                setQuestion(data.question)
                setQuestionId(questionId + ":" + answer);
            })
            .catch((error) =>{
                console.error('Error', error)
            });
    }


    return(
        <>
        <div className="flex flex-col h-screen p-6 bg-light-pink">
            <div className="flex flex-col mx-10 h-2/3 mb-4 p-3 bg-slate-50 bg-opacity-50 rounded-lg overflow-auto">
                <div className="mb-3 p-2 rounded-md bg-slate-200">
                <p>Gorden Ramsey: {question} </p>
                </div>
                <div className="mb-3 p-2 rounded-md bg-green-200 text-right">
                <p>You: Hello Gorden!</p>
                </div>

            </div>

            <div className="flex items-center mx-10 h-1/3 p-3 bg-slate-50 bg-opacity-50 rounded-lg">
                <button onClick={buttonPressed} className="mr-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">Yes</button>
                <button onClick={buttonPressed} className="mr-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">No</button>            </div>
            </div>
        </>
    )
}
export default Chatbox;