import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AccountDetails from './components/AccountDetails';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (username) => {
    // Uppdatera tillståndet för inloggad användare
    setLoggedInUser(username);
  };

  const handleRegister = (username) => {
    // Implementera ytterligare logik om det behövs
    setLoggedInUser(username);
  };

  return (
    <div>
    {loggedInUser ? (
      <AccountDetails username={loggedInUser} />
    ) : isRegistering ? (
      <Register onRegister={handleRegister} />
    ) : (
      <Login onLogin={handleLogin} onRegister={() => setIsRegistering(true)} />
    )}
  </div>
);
};

export default App;