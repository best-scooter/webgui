import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      // POST /customer
      const response = await axios.post('http://localhost:1337/v1/customer', {
        username,
        password,
      })

      // Anropa en callback-funktion för att meddela att registreringen var framgångsrik
      if (onRegisterSuccess) {
        onRegisterSuccess()
      }

      console.log('Registration successful', response.data)
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <label>
        Användarnamn:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Lösenord:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
