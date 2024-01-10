import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Callback from './components/Callback'
import CallbackReg from './components/CallbackReg'
import Dashboard from './components/Dashboard'
import Trips from './components/Trips'
import Home from './components/Home'
import Layout from './components/Layout'
import Register from './components/Register'
import Payments from './components/Payments'

import AdminLander from './components/AdminLander'
import AdminMap from './components/AdminMap'
import AdminLogin from './components/AdminLogin'
import AdminCustomer from './components/AdminCustomer'
import AdminScooter from './components/AdminScooters'
import AdminStations from './components/AdminStations'

import WsTest from './components/WebSocketTest'

const App = () => {
  console.log('App component rendered')
  //const [view, setView] = useState('login') // 'login', 'dashboard'
  //const [loggedInUser, setLoggedInUser] = useState(null)
  //const [oAuthToken, setOAuthToken] = useState(null)

  const handleLogin = (customerId, token) => {
    //setLoggedInUser(customerId)
    //setOAuthToken(token)
    //setView('dashboard')
    localStorage.setItem('oAuthToken', token) // putting these into storage so we can handle logged in users for later
    localStorage.setItem('customerId', customerId)
    window.location.href = 'http://localhost:3000/dashboard' //Omdirigerar till dashboard
  }

  // const handleTrips = (token, customerId) => {
  //   setLoggedInUser(customerId)
  //   setOAuthToken(token)
  //   //setView('dashboard')
  //   localStorage.setItem('oAuthToken', token) // putting these into storage so we can handle logged in users for later
  //   localStorage.setItem('customerId', customerId)
  //   console.log(customerId, 'apppppp')
  //   // Use the 'history' object to navigate
  //   history.push('/v1/trips')
  // }

  // const handlePayments = (token, customerId) => {
  //   setLoggedInUser(customerId)
  //   setOAuthToken(token)
  //   //setView('dashboard')
  //   localStorage.setItem('oAuthToken', token) // putting these into storage so we can handle logged in users for later
  //   localStorage.setItem('customerId', customerId)
  //   // Use the 'history' object to navigate
  //   history.push('/v1/payments')
  // }AdminStations

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />{' '}
          <Route
            path="/authcallback"
            element={<Callback onLogin={handleLogin} />}
          />
          <Route
            path="/authcallbackreg"
            element={<CallbackReg onLogin={handleLogin} />}
          />
          <Route path="/trips" element={<Trips />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/" element={<AdminLander />} />
          <Route path="/admin/map" element={<AdminMap />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/customer" element={<AdminCustomer />} />
          <Route path="/admin/scooter" element={<AdminScooter />} />
          <Route path="/wsTest" element={<WsTest />} />
          <Route path="/admin/stations" element={<AdminStations />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
