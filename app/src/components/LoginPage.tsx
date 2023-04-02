import { Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

interface LoginPageProps {
  onLogin: (isLoggedIn: boolean) => void;
}

//create react component for login form
function LoginPage({onLogin}: LoginPageProps){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            onLogin(true);
            navigate("/", {state: {isLoggedIn: true}});
          }
          else{
            alert('Incorrect username or password')
            navigate("/login", {state: {isLoggedIn: false}});
          }
        });
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label>
        <label>
          Password:
          <input
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default LoginPage;