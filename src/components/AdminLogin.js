import React, { useState } from 'react'
import './Login.css'
import { postAdmin } from '../functions/fetchAdmin'
import { Link, useLocation } from 'react-router-dom'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [LoggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const { message } = location.state || { message: null }

  const handleLogin = async () => {
    try {
      const res = await postAdmin(username, password)
      if (res && res.data.token) {
        localStorage.setItem('admin', true)
        localStorage.setItem('oAuthToken', res.data.token)
        toast.success('Login successful!', { autoClose: 3000 })
        setLoggedIn(true)
      } else {
        console.log('failure in posting credentials')
        toast.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      toast.error(
        'An error occurred while logging in. Try again or contact staff.',
      )
      console.error('Error:', error)
    }
  }

  return (
    <div className="containerLogin">
      {message && <p>{message}</p>}
      <ToastContainer position="top-center" />

      {LoggedIn ? (
        <div style={{ textAlign: 'center' }}>
          <Link to="/admin">Besök admin vyn</Link>
        </div>
      ) : (
        <div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Logga in</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLogin
