// Login.js
import React from 'react'
import './Login.css'
//mha axios kan man göra en GET-förfrågan för att hämta autentiserings-URL och sedan skicka användaren till den URL som returnerats
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  //console.log('Login component rendered');

  // Funktion som initierar kravet 'Kunden kan logga in på en webbplats via OAuth'
  //GET /customer/auth
  const handleLogin = async () => {
    try {
      const email = document.getElementById('email-input').value
      localStorage.setItem('loginEmail', email)
      //Skapa redirect URL för callback, window.location.origin ger URL-originen för den aktuella sidan, ex. http://localhost:3000/
      const redirectUrl = `${window.location.origin}/authcallback`
      //Fetcha authentication URL från API-Server, encodeURIComponent:kodifiera komponenter av en URI (Uniform Resource Identifier) genom att ersätta vissa tecken med deras hexadecimala representationer
      const response = await axios.get(
        `http://localhost:1337/v1/customer/auth?redirectUrl=${encodeURIComponent(
          redirectUrl,
        )}`,
      )
      //window.location.href: redirect användaren till URL:en som erhållits
      window.location.href = response.data.data.url
    } catch (error) {
      console.error('Error fetching authentication URL:', error.message)
    }
  }

  const handleRegister = () => {
    // Redirect to the registration page
    // Use react-router Link for client-side navigation
    window.location.href = '/register'
  }

  return (
    <div className="containerLogin">
      <div className="input-group">
        <input type="text" placeholder="Användarnamn" id="email-input" />
      </div>
      <button onClick={handleLogin}>Logga in</button>
      <button onClick={handleRegister}>Registrera dig</button>
      <Link to="/admin/login">Logga in som staff</Link>
    </div>
  )
}

export default Login
