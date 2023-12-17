import React, { useState } from 'react';
import './OfferSwap.css';
import web3 from '../web3';
import myTicket from '../myTicket';

function OfferSwap() {
  const [offerAddress, setOfferAddress] = useState('');

  const onOffer = async () => {
    const accounts = await web3.eth.getAccounts();
    await myTicket.methods.offerSwap(offerAddress).send({ from: accounts[0] });
    alert("Offer sent!");
  };

  return (
    <div className="offer-swap">
      <input type="text" placeholder="Enter ticket number" value={offerAddress} onChange={e => setOfferAddress(e.target.value)} />
      <button onClick={onOffer}>Offer Swap</button>
    </div>
  );
}

export default OfferSwap;