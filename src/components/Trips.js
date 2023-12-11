// Trips.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trips = ({ oAuthToken, loggedInUser }) => {
  const [tripsData, setTripsData] = useState(null);

  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/trip/by/customer/${loggedInUser}`, {
          headers: {
            'X-Access-Token': oAuthToken
          }
        });
        setTripsData(response.data.data);
        console.log(response.data.data, 'usertrips');
      } catch (error) {
        console.error('Error fetching user trips:', error);
      }
    };

    fetchTripsData();
  }, [oAuthToken, loggedInUser]);

  return (
    <div>
      <h1>Din Reshistorik</h1>
      {tripsData && (
        <div>
          {tripsData.map((trip) => (
            <div key={trip.id}>
              <p>Resa ID: {trip.id}</p>
              <p>Starttid: {trip.timeStarted}</p>
              <p>Sluttid: {trip.timeEnded}</p>
              <p>Avstånd: {trip.distance} km</p>
              <p>Pris: {trip.priceInitial + trip.priceTime + trip.priceDistance} kr</p>
              {/* Lägg till fler detaljer som du vill visa */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;
