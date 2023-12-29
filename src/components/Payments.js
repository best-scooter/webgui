import React, { useState } from 'react'
import axios from 'axios'

const Payments = () => {
  const [amount, setAmount] = useState('')

  const customerId = localStorage.getItem('customerId')
  const token = localStorage.getItem('oAuthToken')
  const currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0

  const handleDeposit = async () => {
    try {
      //Addera innehavande saldo och saldo kunden la till
      const updatedBalance = currentBalance + parseFloat(amount)
      console.log(updatedBalance, 'uppdaterat saldo')

      // PUT /customer/{customerId}
      const response = await axios.put(
        `http://localhost:1337/v1/customer/${customerId}`,
        {
          balance: updatedBalance,
        },
        {
          headers: {
            'X-Access-Token': token,
          },
        },
      )

      console.log('Deposit successful', response.data)
    } catch (error) {
      console.error('Error depositing funds:', error)
    }
  }

  const handleMonthlyPayment = async () => {
    // Implement logic for monthly payment here
    console.log('Monthly payment successful')
  }

  return (
    <div>
      <h1>Payments</h1>
      <label>
        Deposit Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={handleDeposit}>Deposit</button>
      <br />
      <button onClick={handleMonthlyPayment}>Monthly Payment</button>
    </div>
  )
}

export default Payments
