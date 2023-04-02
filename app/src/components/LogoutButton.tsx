import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
    onLogout: () => void;
  }

function LogoutButton(props: LogoutButtonProps){
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )
        .then(response => {
            console.log(response)
            navigate('/');
        })
        .catch(error => {
            console.log(error)
        });
    };
    return <button className="bg-sky-700" type="submit" onClick={handleLogout}>Logout</button>
};

export default LogoutButton;