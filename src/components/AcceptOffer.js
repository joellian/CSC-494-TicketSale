import React, { useState } from 'react';
import './AcceptOffer.css';
import web3 from '../web3';
import myTicket from '../myTicket';

function AcceptOffer() {
  const [acceptAddress, setAcceptAddress] = useState('');

  const onAccept = async () => {
    const accounts = await web3.eth.getAccounts();
    await myTicket.methods.acceptSwapOffer(acceptAddress).send({ from: accounts[0] });
    alert("Offer accepted!");
  };

  return (
    <div className="accept-offer">
      <input type="text" placeholder="Enter ticket number" value={acceptAddress} onChange={e => setAcceptAddress(e.target.value)} />
      <button onClick={onAccept}>Accept Offer</button>
    </div>
  );
}

export default AcceptOffer;