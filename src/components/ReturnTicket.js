import React, { useState } from 'react';
import './ReturnTicket.css';
import myTicket from '../myTicket';
import web3 from '../web3';

function ReturnTicket() {
  const [returnAddress, setReturnAddress] = useState('');

  const onReturn = async () => {
    const accounts = await web3.eth.getAccounts();
    await myTicket.methods.returnTicket(returnAddress).send({ from: accounts[0], value: await myTicket.methods.ticketPrice().call() });
    alert("Returned ticket " + returnAddress);
  };

  return (
    <div className="return-ticket">
      <input type="text" placeholder="Enter address" value={returnAddress} onChange={e => setReturnAddress(e.target.value)} />
      <button onClick={onReturn}>Return Ticket</button>
    </div>
  );
}

export default ReturnTicket;