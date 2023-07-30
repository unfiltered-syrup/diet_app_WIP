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
    const [clicked, setClicked] = useState<boolean>(false);
    const initialRender = useRef(true);
    const [chatHistory, setChatHistory] = useState<string[]>(['Hello there!', 'Hello Gorden!', '']);

    // set up a variable to decide what kind of question is
    const isOption = question && question.includes('option');
    const isTextbox = question && question.includes('follow_up');

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        console.log("clicked_count :" + clickCount);
        record_response();
    }, [clickCount]);

    useEffect(() => {
        console.log('question_id -> ' + questionId);
    }, [questionId]);

    useEffect(() => {
        console.log('question is : ' + question);
    }, [question]);

    useEffect(() => {
        console.log('answer : ' + answer);
    }, [answer]);

    useEffect(() => {
        console.log('chatHistory -> ' + chatHistory);
    }, [chatHistory]);


    const buttonPressed = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const buttonContent = (e.target as HTMLElement).innerText;

        // if (questionId == "") {
        //     console.log("here")
        //     setQuestionId(buttonContent);
        // }
        // else {
        //     console.log('there');
        //     setQuestionId(questionId + ":" + buttonContent);
        // }
        // console.log('question_id ->' + questionId);

        let mappedValue = buttonContent; // By default, map the displayed text to the value sent

        // Map the displayed text to the value you want to send to the server
        if (buttonContent === "Submit") {
            mappedValue = "FOLLOW_UP";
        }

        setAnswer(mappedValue);
        setClickCount((prevClickCount) => prevClickCount + 1);

        //console.log(buttonContent);
        console.log('button pressed : ' + buttonContent);
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
                // Set the question first
                setQuestion(data.question);
                if (data.question.includes('follow_up'))
                    data.question = data.question.substring(12);
                // Update the chat history
                // Update the questionId
                if (questionId === "") {
                    setQuestionId(answer);
                    //setChatHistory(prevHistory => [...prevHistory, answer]);
                } else {
                    setQuestionId(questionId + ":" + answer);
                }
                setChatHistory(prevHistory => [...prevHistory, answer]);
                setChatHistory(prevHistory => [...prevHistory, data.question]);
            })
            .catch((error) => {
                console.error('Error', error)
            });
    }


    return (
        <div className="flex flex-col h-screen p-6 bg-beige">
            <div className="flex flex-col mx-10 h-2/3 mb-4 p-3 bg-cornsilk bg-opacity-50 rounded-lg overflow-auto">
                {chatHistory.map((entry, index) => {
                    if (entry.trim() === "") return null;
                    const isSenderGR = index % 2 === 0;
                    const senderLabel = isSenderGR ? "GR" : "ME";

                    return (
                        <div
                            key={index}
                            className={`col-start-6 col-end-13 p-3 rounded-lg ${isSenderGR ? "" : "flex-row-reverse"
                                }`}
                        >
                            <div className={`flex items-center justify-start ${isSenderGR ? "" : 'flex-row-reverse'}`}>
                                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isSenderGR ? "bg-sand" : "bg-olivine"
                                    } flex-shrink-0 border-solid border-light-green border-2"`}>
                                    <span className={`text-cornsilk font-mono`}>
                                        {senderLabel}
                                    </span>
                                </div>
                                <div className={`relative ml-3 mr-3 text-sm ${isSenderGR ? "bg-papaya-whip" : "bg-beige"
                                    } py-2 px-4 shadow rounded-xl`}>
                                    <div className={`text-neutral-600 font-mono`}>
                                        {entry}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col gap-2 items-center justify-center mx-10 h-1/3 p-3 bg-cornsilk bg-opacity-50 rounded-lg">
                {!isOption && !isTextbox ? (
                    <>
                        {/* For questions with "YES" and "NO" options, render buttons */}
                        <button
                            onClick={buttonPressed}
                            className="w-full h-1/2 rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                        >
                            YES
                        </button>
                        <button
                            onClick={buttonPressed}
                            className="w-full h-1/2 rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                        >
                            NO
                        </button>
                    </>
                ) : (
                    <>
                        {isOption ? ( // option
                            <>
                                <div className="grid grid-cols-2 gap-2 w-full h-full">
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        KETO
                                    </button>
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        PALEO
                                    </button>
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        VEGAN
                                    </button>
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        VEGETARIAN
                                    </button>
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        GLUTEN-FREE
                                    </button>
                                    <button
                                        onClick={buttonPressed}
                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                    >
                                        OTHER
                                    </button>
                                </div>
                            </>
                        ) : ( // textbox
                            <>
                                <input
                                    type="text"
                                    placeholder="Type your answer here"
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full h-1/2 rounded-md bg-white text-olivine font-mono"
                                />
                                <button
                                    onClick={buttonPressed}
                                    className="w-full h-1/2 rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );


}

export default Chatbox;