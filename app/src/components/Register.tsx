import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

interface RegisterPageProps {
    onReg: (isLoggedIn: string | undefined) => void;
  }
  
  //create react component for login form
  function Register({onReg}: RegisterPageProps){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      fetch('http://localhost:5000/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, name, password}),
          })
          .then(response => response.json())
          .then(data => {
            if(data.success == 'True'){
              console.log('navigating...');
              onReg('true');
              navigate("/", {state: {isLoggedIn: 'true'}});
            }
            else{
              alert('Incorrect username or password')
              navigate("/register", {state: {isLoggedIn: 'false'}});
            }
          });
    }
  
    return (
      <>
    <div className= "text-2x1 font-semibold flex items-center justify-center h-full w-full">
    <div className='flex mx-auto p-10 justify-center border-4 border-solid border-light-green bg-light-green'>

    <div className="flex flex-col items-center">
    <h1 className="sm:text-lg md:text-xl lg:text-3xl mb-8 ">Let's get started👋 </h1>
        <form className="w-full max-w-sm">
          <div className="flex items-center mb-6">
            <div className="w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email:
                </label>
            </div>
            <div className="w-2/3">
              <input
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="myemail@gmail.com"
              />
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Username:
                </label>
            </div>
            <div className="w-2/3">
              <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Jane Doe"
              />
            </div>
          </div>
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password:
            </label>
          </div>
          <div className="w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  placeholder="******************"
              type="text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
          <div className="md:flex md:items-center">
          <div className="flex m-auto justify-center">
              <button onClick={handleSubmit} className="shadow bg-dark-green hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Create Account
              </button>
            </div>
         </div>
      </form>
    </div>
    </div>
    </div>
    </>
    )
  }
  
  export default Register;