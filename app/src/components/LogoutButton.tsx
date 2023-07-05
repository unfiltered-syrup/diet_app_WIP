import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


interface LogoutProps {
    onLogout: (isLoggedIn: string | undefined) => void;
  }
function LogoutButton({onLogout}: LogoutProps) {
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<SVGSVGElement>) => {
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
            onLogout('false');
            navigate('/', {state: {isLoggedIn: 'false'}});
        })
        .catch(error => {
            console.log(error)
        });
    };
    return <div className="transition-transform group-hover:-translate-x-16">
    <FontAwesomeIcon onClick={handleLogout} icon={icon({name: 'arrow-right-from-bracket', family: 'sharp', style: 'light'})} size="3x"  color='cornsilk'/>
    </div>
};

export default LogoutButton;