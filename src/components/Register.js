// Register.js
import React, { useState } from 'react';
import './Register.css'; // Importera CSS-fil

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Implementera här logik för registrering
        // Exempel: Anropa en API för att skapa ett nytt konto
        // och om det är framgångsrikt, anropa onRegister
        onRegister(username);
    };

    return (
        <div className="container">
        <div className="input-group">
            <input
            type="text"
            placeholder="Användarnamn"
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="input-group">
            <input
            type="password"
            placeholder="Lösenord"
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button onClick={handleRegister}>Registrera</button>
        </div>
    );
    };

export default Register;
