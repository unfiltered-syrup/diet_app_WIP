import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useRef } from "react";

//holds message data
function Chatbox() {
    const [question, setQuestion] = useState<string>("");
    const [questionId, setQuestionId] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [clickCount, setClickCount] = useState<number>(0);
    const initialRender = useRef(true);

    useEffect(() => {
        record_response();
    }, [clickCount]);

    const buttonPressed = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setClickCount(clickCount + 1);
        const buttonContent = (e.target as HTMLElement).innerText;
        setAnswer(buttonContent);
        console.log('question_id' + questionId);
        console.log(buttonContent);
        console.log('button pressed');
    };

    function record_response() {
        fetch('http://localhost:5000/api/get_response', {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: answer,
                question_id: questionId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setQuestion(data.question)
                console.log('question_id added');
                if (!questionId) {
                    setQuestionId(answer);
                }
                else {
                    setQuestionId(questionId + ":" + answer);
                }
                console.log('question_id:' + questionId)
            })
            .catch((error) => {
                console.error('Error', error)
            });
    }



    return (
        <>


            {/* <div className="flex flex-col mx-10 h-2/3 mb-4 p-3 bg-slate-50 bg-opacity-50 rounded-lg overflow-auto">
                
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                Gorden Ramsey
                </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                {question}
                </div>
            <div className="mb-3 p-2 rounded-md bg-green-200 text-right">
                <p>You: Hello Gorden!</p>
                </div>

            </div> */}
            <div className="flex flex-col h-screen p-6 bg-light-pink">
                <div className="flex flex-col mx-10 h-2/3 mb-4 p-3 bg-slate-50 bg-opacity-50 rounded-lg overflow-auto">
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark-green flex-shrink-0">
                                <span className="text-rose-50 font-mono">GR</span>
                            </div>
                            <div className="relative ml-3 text-sm bg-light-pink py-2 px-4 shadow rounded-xl">
                                <div className="text-dark-green font-mono">{question}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dark-green flex-shrink-0">
                                <span className="text-rose-50 font-mono">ME</span>
                            </div>
                            <div className="relative mr-3 text-sm bg-light-pink py-2 px-4 shadow rounded-xl">
                                <div className="text-dark-green font-mono">Hello Gorden!</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mx-10 h-1/3 p-3 bg-slate-50 bg-opacity-50 rounded-lg">
                    <button onClick={buttonPressed} 
                    className="mr-2 py-2 px-4 rounded-md bg-dark-green text-white hover:bg-emerald-800 font-mono">
                        yes</button>
                    <button onClick={buttonPressed} 
                    className="mr-2 py-2 px-4 rounded-md bg-dark-green text-white hover:bg-emerald-800 font-mono">
                        no</button>
                </div>
            </div>

        </>
    )
}
export default Chatbox;