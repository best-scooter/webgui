// Login.js
import React, { useEffect } from 'react';
import './Login.css';
import './loading.css'

import axios from 'axios';

const Callback = ( {onLogin} ) => {


    useEffect(() => {
        //console.log('useEffect started');

        const handleAuthCallback = async () => {
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
                }};
                handleAuthCallback();
                //console.log('useEffect finished');
    }, [onLogin]);

    return (
        <div className="loading-container">
            <div className="loader"></div>
            <p style={{ color: 'white', textAlign: 'center' }}>Loading</p>
        </div>
      );
};

export default Callback;