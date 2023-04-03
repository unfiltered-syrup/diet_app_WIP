import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

interface LoginPageProps {
  onLogin: (isLoggedIn: string | undefined) => void;
}

//create react component for login form
function LoginPage({onLogin}: LoginPageProps){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, password}),
        })
        .then(response => response.json())
        .then(data => {
          if(data.success == 'True'){
            console.log('navigating...');
            onLogin('true');
            navigate("/", {state: {isLoggedIn: 'true'}});
          }
          else{
            alert('Incorrect username or password')
            navigate("/login", {state: {isLoggedIn: 'false'}});
          }
        });
  }

  return (
    <>
    <div className="flex m-auto justify-center">
      <h1 className="block sm:text-lg md:text-xl lg:text-3xl mb-8">Login</h1>
    </div>
    <div className="flex place-self-center">
      <form className="w-full max-w-sm">
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
            Sign In
            </button>
          </div>
       </div>
    </form>
  </div>
  </>
  )
}

export default LoginPage;