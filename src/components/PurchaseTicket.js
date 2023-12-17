import React, { useState } from 'react';
import './PurchaseTicket.css';
import web3 from '../web3';
import myTicket from '../myTicket';

function PurchaseTicket() {
  const [ticketID, setTicketID] = useState('');

  const onPurchase = async () => {
    const accounts = await web3.eth.getAccounts();
    await myTicket.methods.buyTicket(ticketID).send({ from: accounts[0], value: await myTicket.methods.ticketPrice().call() });
    alert("Purchased ticket " + ticketID);
  };

  return (
    <div className="purchase-ticket">
      <input type="text" placeholder="Enter ticket number" value={ticketID} onChange={e => setTicketID(e.target.value)} />
      <button onClick={onPurchase}>Purchase</button>
    </div>
  );
}

export default PurchaseTicket;