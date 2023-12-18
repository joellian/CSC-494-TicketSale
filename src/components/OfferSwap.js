import React, { useState } from 'react';
import './OfferSwap.css';
import web3 from '../web3';
import myTicket from '../myTicket';

// Mock implementation of convertTicketNumberToAddress
const convertTicketNumberToAddress = (ticketNumber) => {
  // Convert the ticket number to a valid Ethereum address
  // Mock Implementation - replace later
  return '0x' + ticketNumber.padStart(40, '0');
};

function OfferSwap() {
  const [ticketNumber, setTicketNumber] = useState('');

  const onOffer = async () => {
    const accounts = await web3.eth.getAccounts();
    const offerAddress = convertTicketNumberToAddress(ticketNumber);
    await myTicket.methods.offerSwap(offerAddress).send({ from: accounts[0] });
    alert("Offer sent!");
  };

  return (
    <div className="offer-swap">
      <input type="text" placeholder="Enter ticket number" value={ticketNumber} onChange={e => setTicketNumber(e.target.value)} />
      <button onClick={onOffer}>Offer Swap</button>
    </div>
  );
}

export default OfferSwap;
