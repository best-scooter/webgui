import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = async () => {
    try {
      // POST /customer
      const response = await axios.post('http://localhost:1337/v1/customer', {
        name,
        email,
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
