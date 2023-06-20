import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

interface PopupWindowProps {
    userName: string;
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode; // Added children prop of type React.ReactNode
}

const PopupWindow = (props: PopupWindowProps) => {

    const navigate = useNavigate();
    const name = props.userName;
    const [password, setPassword] = useState("");

    const [showPasswordChange, setPasswordChange] = useState(false);
    const [showUsernameChange, setShowUsernameChange] = useState(false);

    const checkPassword = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('checkPassword called');
        fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success === 'True') {
                    setPasswordChange(true);
                    setShowUsernameChange(true);
                } else {
                    alert('Incorrect password');
                }
            });
    }

    if (!props.isVisible) {
        return null; // Don't render anything if the window is not visible
    }

    if (props.children == "changeUsername" && showUsernameChange) {

        return (
            <>
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
                ></div>
                <div
                    id="UsernameModal"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 rounded-t">
                                <h3 className="font-UI text-lg flex items-center justify-center">Change Username</h3>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={props.onClose} // Added event handler to hide the modal
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-5">
                                <div>
                                    <label className="font-UI text-sm">Old Username</label>
                                    <input className="bg-pink-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5" placeholder="Jane Doe" required
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="px-5 py-5">
                                <div>
                                    <label className="font-UI text-sm">New Username</label>
                                    <input placeholder="June Dou" className="bg-pink-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5" required
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-200 text-black bg-pink-100 hover:bg-pink-200 font-UI rounded-lg text-sm px-5 py-2.5 text-center m-5">submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    } else if (props.children == "changePassword" && showPasswordChange ) {

        return (
            <>
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
                ></div>
                <div
                    id="Passwordmodal"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
                >
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 rounded-t">
                                <h3 className="font-UI text-lg flex items-center justify-center">Change Password</h3>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={props.onClose} // Added event handler to hide the modal
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-5">
                                <div>
                                    <label className="font-UI text-sm">Old Password</label>
                                    <input className="bg-pink-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5" placeholder="******************" required
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="px-5 py-5">
                                <div>
                                    <label className="font-UI text-sm">New Password</label>
                                    <input className="bg-pink-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5" placeholder="******************" required
                                        type="text"
                                        value=""
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-200 text-black bg-pink-100 hover:bg-pink-200 font-UI rounded-lg text-sm px-5 py-2.5 text-center m-5">submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    } else if (props.children == "changeUsername" || props.children == "changePassword") {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"></div>
                <div id="UsernameModal" aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 rounded-t">
                                <h3 className="font-UI text-lg flex items-center justify-center">Re-enter Password</h3>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={props.onClose}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="px-5">
                                <div>
                                    <label className="font-UI text-sm">Your Password</label>
                                    <input
                                        className="bg-pink-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dark-green focus:border-dark-green block w-full p-2.5" required
                                        placeholder="******************"
                                        type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={checkPassword} className="w-200 text-black bg-pink-100 hover:bg-pink-200 font-UI rounded-lg text-sm px-5 py-2.5 text-center m-5">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }
    return null;
};

export default PopupWindow;