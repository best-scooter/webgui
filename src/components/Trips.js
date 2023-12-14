// Trips.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trips.css';

const Trips = ({ oAuthToken, loggedInUser, onViewDashboardClick}) => {
  const [tripsData, setTripsData] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('customerId')
    const fetchTripsData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/trip/by/customer/${loggedInUser}`, {
          headers: {
            'X-Access-Token': oAuthToken
          }
        });
        setTripsData(response.data.data);
        console.log(response.data.data)
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
        <div className="trips-container">
          {tripsData.map((trip, index) => (
            <div key={trip.id} className="trip-box">
              <p>Resa ID: {trip.id}</p>
              <p>Scooter ID: {trip.scooterId}</p>
              <p>Starttid: {trip.timeStarted}</p>
              <p>Sluttid: {trip.timeEnded}</p>
              <p>Avstånd: {trip.distance} km</p>
              <p>Rutt: {trip.route}</p>
              <p>Bästa parkeringszon: {trip.bestParkingZone}</p>
              <p>Bästa upphämtningszon: {trip.bestPickupZone}</p>
              <p>Laddas vid parkering: {trip.parkedCharging}</p>
              <p>Pris: {trip.priceInitial + trip.priceTime + trip.priceDistance} kr</p>

            {/* Render a line separator except for the last trip */}
            {index !== tripsData.length - 1 && <hr className="trip-separator" />}

            </div>
          ))}
        </div>
      )}

    <button onClick={onViewDashboardClick}>Dashboard</button>
    </div>
  );
};

export default Trips;
