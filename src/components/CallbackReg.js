import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import './loading.css'

import axios from 'axios'

const Callback = ({ onLogin }) => {
  const navigate = useNavigate()

  useEffect(() => {
    //console.log('useEffect started');

    const handleAuthCallback = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code')
        const state = new URLSearchParams(window.location.search).get('state')
        // console.log(code, 'code')
        // console.log(state, 'state')

        // Avbryt om ingen code
        if (!code) {
          return
        }

        // Om det finns en kod, byt ut 'code' för en OAuthToken
        const response = await axios.post(
          'http://localhost:1337/v1/customer/auth',
          { code, state },
        )
        const oAuthToken = response.data.data.oAuthToken
        const registerEmail = localStorage.getItem('registerEmail')
        const registerName = localStorage.getItem('registerName')
        // console.log(oAuthToken, 'oauthtoken')
        // Spara undan OAuth-token som vi fått lokalt
        localStorage.setItem('oAuthToken', oAuthToken)

        // Ifall vi fått en oauthtoken så har oauth-autentiseringen lyckats
        if (!(oAuthToken && registerEmail)) {
          return
        }

        // POST /customer
        const postCustomerResponse = await axios.post(
          'http://localhost:1337/v1/customer/0',
          {
            customerName: registerName,
            email: registerEmail,
          },
        )

        // POST /customer/token
        const tokenResponse = await axios.post(
          'http://localhost:1337/v1/customer/token',
          { email: registerEmail, oAuthToken },
        )

        // Bryt ut token, email, customerID från tokenResponse
        const token = tokenResponse.data.data.token
        const oAuthEmail = tokenResponse.data.data.oAuthEmail
        // ...och id från postCustomerResponse
        const customerId = postCustomerResponse.data.data.customerId

        // Om register email är samma som oauth email anse att registreringen lyckades
        if (oAuthEmail === registerEmail) {
          // Skicka tillbaka användarinformationen till App.js för att logga in användaren
          return onLogin(customerId, token)
        }

        // Fel! Ta bort användaren
        console.warn('Email not equal to email on oauth provider.')
        axios.delete('http://localhost:1337/v1/customer/' + customerId, {
          headers: {
            'X-Access-Token': token,
          },
        })

        // Och skicka tillbaka till register
        return navigate('/register')
      } catch (error) {
        console.error('Error exchanging code for OAuth token:', error)
      }
    }
    handleAuthCallback()
    //console.log('useEffect finished');
  }, [onLogin])

  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p style={{ color: 'white', textAlign: 'center' }}>Loading</p>
    </div>
  )
}

Callback.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default Callback
