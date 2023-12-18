import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Callback from './components/Callback'
import Dashboard from './components/Dashboard'
import Trips from './components/Trips'
import Home from './components/Home'
import Layout from './components/Layout'

import AdminLander from './components/AdminLander'
import AdminMap from './components/AdminMap'
import AdminLogin from './components/AdminLogin'
import AdminCustomer from './components/AdminCustomer'

const App = () => {
  console.log('App component rendered')
  //const [view, setView] = useState('login') // 'login', 'dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [oAuthToken, setOAuthToken] = useState(null)

  const handleLogin = (customerId, token) => {
    setLoggedInUser(customerId)
    setOAuthToken(token)
    //setView('dashboard')
    localStorage.setItem('oAuthToken', token) // putting these into storage so we can handle logged in users for later
    localStorage.setItem('customerId', customerId)
    window.location.href = 'http://localhost:3000/' //testing
  }

  const handleViewDashboard = () => {
    //setView('dashboard')
  }

  // const handleViewTrips = (token, customerId) => {
  //   setLoggedInUser(customerId)
  //   setOAuthToken(token)
  //   setView('trips')
  // }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />{' '}
          {/* prop behövs inte längre här */}
          <Route
            path="/authcallback"
            element={<Callback onLogin={handleLogin} />}
          />
          <Route
            path="/trips"
            element={
              <Trips
                oAuthToken={oAuthToken}
                loggedInUser={loggedInUser}
                onViewDashboardClick={handleViewDashboard}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/" element={<AdminLander />} />
          <Route path="/admin/map" element={<AdminMap />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/customer" element={<AdminCustomer />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
