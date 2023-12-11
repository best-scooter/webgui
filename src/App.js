import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [view, setView] = useState('login'); // 'login', 'authCallback', 'dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [oAuthToken, setOAuthToken] = useState(null);

  const handleLogin = (username, token) => {
    setLoggedInUser(username);
    setOAuthToken(token);
    setView('dashboard');
  };

  return (
    <div>
      {view === 'dashboard' ? (
        <Dashboard oAuthToken={oAuthToken} loggedInUser={loggedInUser} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};


export default App;
