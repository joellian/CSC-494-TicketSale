import React, { useState } from 'react';
import './GetTicketNumber.css';
import web3 from '../web3';
import myTicket from '../myTicket';

function GetTicketNumber() {
  const [getAddress, setGetAddress] = useState('');

  const onGet = async () => {
    const ticketGot = await myTicket.methods.getTicketOf(getAddress).call();
    alert("User owns ticket " + ticketGot);
  };

  return (
    <div className="get-ticket-number">
      <input type="text" placeholder="Enter address" value={getAddress} onChange={e => setGetAddress(e.target.value)} />
      <button onClick={onGet}>Get Ticket Number</button>
    </div>
  );
}

export default GetTicketNumber;