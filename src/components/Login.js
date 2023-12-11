// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';
//mha axios kan man göra en GET-förfrågan för att hämta autentiserings-URL och sedan skicka användaren till den URL som returnerats
import axios from 'axios';

//import { useLocation } from 'react-router-dom';


const Login = ({ onLogin }) => {
    //const location = useLocation();

    // Funktion som initierar kravet 'Kunden kan logga in på en webbplats via OAuth'
    //GET /customer/auth
    const handleLogin = async () => {
        try {
            //Skapa redirect URL för callback, window.location.origin ger URL-originen för den aktuella sidan, ex. http://localhost:3000/
            const redirectUrl = `${window.location.origin}/authcallback`;
            //Fetcha authentication URL från API-Server, encodeURIComponent:kodifiera komponenter av en URI (Uniform Resource Identifier) genom att ersätta vissa tecken med deras hexadecimala representationer 
            const response = await axios.get(`http://localhost:1337/customer/auth?redirectUrl=${encodeURIComponent(redirectUrl)}`);
            //console.log(response);
            //window.location.href: redirect användaren till URL:en som erhållits
            window.location.href = response.data.data.url;
            console.log(response.data.data.url, 'handlelogin');
        } catch (error) {
            console.error('Error fetching authentication URL:', error.message);
        }
    };

    //Hanterar OAUth callbaken efter att komponenten har byggts
    // POST /customer/auth
    useEffect(() => {
        const handleAuthCallback = async () => {
            console.log(window.location.search, 'first');
            try {
                const code = new URLSearchParams(window.location.search).get('code');
                const state = new URLSearchParams(window.location.search).get('state');
                console.log(code, 'code');
                console.log(state, 'state');
                if (code) {
                    // Om det finns en kod, byt ut 'code' för en OAuthToken
                    const response = await axios.post('http://localhost:1337/customer/auth', { code, state });
                    const oAuthToken = response.data.data.oAuthToken;
                    console.log(oAuthToken, 'oauthtoken');
    
                    // Spara undan OAuth-token som vi fått lokalt
                    localStorage.setItem('oAuthToken', oAuthToken);
    
                    // POST /customer/token
                    const tokenResponse = await axios.post('http://localhost:1337/customer/token', { oAuthToken });
    
                    // Bryt ut token, email, customerID från tokenResponse
                    const { token, email, customerId } = tokenResponse.data.data;
                    console.log('Token:', token);
                    console.log('Email:', email);
                    console.log('CustomerId:', customerId);

                    // Skicka tillbaka användarinformationen till App.js
                    onLogin(customerId, token);
                } 
            } catch (error) {
                console.error('Error exchanging code for OAuth token:', error);
            }
        };
        handleAuthCallback();
    }, [window.location]);
    
    
    return (
        <div className="container">
            <div className="input-group">
                <input
                type="text"
                placeholder="Användarnamn"
                />
            </div>
            <div className="input-group">
                <input
                type="password"
                placeholder="Lösenord"
                />
            </div>
            <button onClick={handleLogin}>Logga in med OAuth</button>
        </div>
    );
};

export default Login;