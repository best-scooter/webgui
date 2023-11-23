// Login.js
import React, { useState } from 'react';
import './Login.css'; // Importera CSS-fil

const Login = ({ onLogin, onRegister }) => { // Lägg till onRegister här
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implementera här logik för inloggning
        // Exempel: Anropa en API för autentisering
        // och om det är framgångsrikt, anropa onLogin
        onLogin(username);
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
            <button onClick={handleLogin}>Logga in</button>
            <p>
                Har inget konto?{' '}
                <button onClick={onRegister} className="register-link">
                Registrera här
                </button>
            </p>
        </div>
    );
};

export default Login;

