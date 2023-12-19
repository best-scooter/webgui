import React, { useState } from 'react';
import axios from 'axios';

const Payments = ({ oAuthToken, loggedInUser }) => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    try {
      // PUT /customer/{customerId}
      const response = await axios.put(
        `http://localhost:1337/v1/customer/${loggedInUser}`,
        {
          balance: amount,
        },
        {
          headers: {
            'X-Access-Token': oAuthToken,
          },
        }
      );

      console.log('Deposit successful', response.data);
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  const handleMonthlyPayment = async () => {
    // Implement logic for monthly payment here
    // ...
    console.log('Monthly payment successful');
  };

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
  );
};

export default Payments;

