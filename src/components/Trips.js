// Trips.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Trips.css'

const Trips = ({ oAuthToken, loggedInUser }) => {
  const [tripsData, setTripsData] = useState(null)

  function calculateCost(priceInitial, priceTime, timeStarted, timeEnded) {
    const startedTime = new Date(timeStarted)
    const endedTime = new Date(timeEnded)
    const timeDifferenceMs = endedTime - startedTime
    const timeDurationInSeconds = timeDifferenceMs / 1000

    return priceInitial + priceTime * timeDurationInSeconds
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('customerId')
    const fetchTripsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/v1/trip/by/customer/${loggedInUser}`,
          {
            headers: {
              'X-Access-Token': oAuthToken,
            },
          },
        )
        setTripsData(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching user trips:', error)
      }
    }

    fetchTripsData()
  }, [oAuthToken, loggedInUser])

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
              <p>Avstånd: {trip.distance}m</p>
              <p>Rutt: {trip.route}</p>
              <p>Bästa parkeringszon: {trip.bestParkingZone}</p>
              <p>Bästa upphämtningszon: {trip.bestPickupZone}</p>
              <p>Laddas vid parkering: {trip.parkedCharging}</p>
              <p>
                Pris:{' '}
                {calculateCost(
                  trip.priceInitial,
                  trip.priceTime,
                  trip.timeStarted,
                  trip.timeEnded,
                )}
                kr
              </p>

              {/* Render a line separator except for the last trip */}
              {index !== tripsData.length - 1 && (
                <hr className="trip-separator" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* <button onClick={onViewDashboardClick}>Dashboard</button> */}
    </div>
  )
}

export default Trips
