import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

import Trips from './Trips';

const Dashboard = ({ oAuthToken, loggedInUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Hämta kundinformation baserat på användarens ID
        //GET /customer/{customerId}
        const response = await axios.get(`http://localhost:1337/customer/${loggedInUser}`, {
          headers: {
            'X-Access-Token': oAuthToken
          }
        });
        setUserData(response.data.data);
        //console.log(response.data.data, 'userdata från customer/id')
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

  }, [oAuthToken, loggedInUser]);

  return (
    <div>
      <div>
        <h1>Välkommen!</h1>
        {userData && (
          <>
            <p>Användar-ID: {userData.id}</p>
            <p>Namn: {userData.customerName}</p>
            <p>Email: {userData.email}</p>
            <p>Position X: {userData.positionX}</p>
            <p>Position Y: {userData.positionY}</p>
            <p>Saldo: {userData.balance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
