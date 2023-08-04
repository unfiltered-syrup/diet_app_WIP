import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useRef } from "react";

interface OptionsProps {
        options: string[];
        NumofOptions: number;
        pressed: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChatBoxOptions: React.FC<OptionsProps> = (props) => {
        return (
                <>
                        {props.NumofOptions == 2 ? (
                                <>
                                        {/* For questions with "YES" and "NO" options, render buttons */}
                                        <button
                                                onClick={(e) => props.pressed(e)}
                                                className="w-full h-1/2 rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                        >
                                                YES
                                        </button>
                                        <button
                                                onClick={(e) => props.pressed(e)}
                                                className="w-full h-1/2 rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                        >
                                                NO
                                        </button>
                                </>
                        ) : (
                                <div className="grid grid-cols-2 gap-2 w-full h-full">
                                        {props.options.map((option, index) => (
                                                <button
                                                        key={index}
                                                        onClick={(e) => props.pressed(e)} // Call handleOptionClick when the button is clicked
                                                        className="rounded-md bg-olivine text-cornsilk hover:bg-moss-green font-mono"
                                                >
                                                        {option}
                                                </button>
                                        ))}
                                </div>
                        )}
                </>
        );
};

export default ChatBoxOptions;