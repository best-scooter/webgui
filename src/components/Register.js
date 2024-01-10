import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  // const Register = ({ onRegisterSuccess, onLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = async () => {
    try {
      localStorage.setItem('registerName', name)
      localStorage.setItem('registerEmail', email)

      //Skapa redirect URL för callback, window.location.origin ger URL-originen för den aktuella sidan, ex. http://localhost:3000/
      const redirectUrl = `${window.location.origin}/authcallbackreg`
      //Fetcha authentication URL från API-Server, encodeURIComponent:kodifiera komponenter av en URI (Uniform Resource Identifier) genom att ersätta vissa tecken med deras hexadecimala representationer
      const response = await axios.get(
        `http://localhost:1337/v1/customer/auth?redirectUrl=${encodeURIComponent(
          redirectUrl,
        )}`,
      )
      //window.location.href: redirect användaren till URL:en som erhållits
      return (window.location.href = response.data.data.url)
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
