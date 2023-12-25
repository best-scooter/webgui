import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = ({ oAuthToken, loggedInUser }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = localStorage.getItem('customerId')
      const oAuthToken = localStorage.getItem('oAuthToken')

      try {
        // Hämta kundinformation baserat på användarens ID
        //GET /customer/{customerId}
        const response = await axios.get(
          `http://localhost:1337/v1/customer/${loggedInUser}`,
          {
            headers: {
              'X-Access-Token': oAuthToken,
            },
          },
        )
        // Bryt ut token, email, customerID från tokenResponse
        const { id, balance } = response.data.data
        console.log('CustomerId:', id)

        setUserData(response.data.data)
        //Spara undan nuvarande saldo så att det finns tillgängligt för Payment.js
        localStorage.setItem('currentBalance', balance)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [oAuthToken, loggedInUser])

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
  )
}

export default Dashboard
