// AccountDetails.js
import React from 'react';

const AccountDetails = ({ username }) => {
  // Hämta och visa kundens detaljer från din backend/databas?
    return (
        <div>
        <h2>Kontodetaljer för {username}</h2>
        {/* Visa kundens information här */}
        </div>
    );
};

export default AccountDetails;
