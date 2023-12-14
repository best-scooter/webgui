import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Trips from './components/Trips';

const App = () => {
  console.log('App component rendered');
  const [view, setView] = useState('login'); // 'login', 'dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [oAuthToken, setOAuthToken] = useState(null);

  const handleLogin = (username, token) => {
    setLoggedInUser(username);
    setOAuthToken(token);
    setView('dashboard');
  };

  const handleViewDashboard = () => {
    setView('dashboard');
  };

  const handleViewTrips = (token, customerId) => {
    setLoggedInUser(customerId);
    setOAuthToken(token);
    setView('trips');
  };

  return (
    <div>
    {view === 'dashboard' ? (
      <Dashboard oAuthToken={oAuthToken} loggedInUser={loggedInUser} onViewTripsClick={handleViewTrips} />
    ) : (
      view === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : view === 'trips' ? (
        <Trips oAuthToken={oAuthToken} loggedInUser={loggedInUser} onViewDashboardClick={handleViewDashboard}/>
      ): null
    )}
  </div>
);
};


export default App;
