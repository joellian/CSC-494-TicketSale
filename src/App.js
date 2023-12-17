import React from 'react';
import web3 from '../../my-ticket-react/src/web3';
import myTicket from '../../my-ticket-react/src/myTicket';
import PurchaseTicket from '../../my-ticket-react/src/components/PurchaseTicket';
import OfferSwap from '../../my-ticket-react/src/components/OfferSwap';
import AcceptOffer from '../../my-ticket-react/src/components/AcceptOffer';
import GetTicketNumber from '../../my-ticket-react/src/components/GetTicketNumber';
import ReturnTicket from '../../my-ticket-react/src/components/ReturnTicket';
import Header from '../../my-ticket-react/src/components/Header';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: '',
      ticketNo: 0,
      returnID: 0,
      buyID: 0,
      acceptSwapAddress: 0,
      offerSwapAddress: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const addr = await web3.currentProvider.selectedAddress;
    const manager = await myTicket.methods.manager().call();
    const ticketNo = await myTicket.methods.getTicketOf(addr).call();
    this.setState({ manager, ticketNo });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    const addr = await web3.currentProvider.selectedAddress;
    const buttontype = window.event.submitter.name;
    const { returnID, buyID, acceptSwapAddress, offerSwapAddress } = this.state;
  
    if (buttontype === "returnTicket") {
      event.preventDefault();
      myTicket.methods.returnTicket().send({
        from: addr,
      });
      alert(`
       Ticket No. ${returnID} returned successfully!
     `);
    }
    else if (buttontype === "buyTicket") {
      event.preventDefault();
      myTicket.methods.buyTicket(buyID).send({
        from: addr,
      });
      alert(`
       Ticket No. ${buyID} awaiting transaction confirmation...
     `);
    }
    else if (buttontype === "offerSwap") {
      event.preventDefault();
      myTicket.methods.offerSwap(offerSwapAddress).send({
        from: addr,
      });
      alert(`
       Ticket No. ${offerSwapAddress} awaiting swap request confirmation...
     `);
    }
    else if (buttontype === "acceptSwap") {
      event.preventDefault();
      myTicket.methods.acceptSwap(acceptSwapAddress).send({
        from: addr,
      });
      alert(`
       Ticket No. ${acceptSwapAddress} awaiting swap accept confirmation...
     `);
    }
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div className="grid-container">
          <PurchaseTicket />
          <OfferSwap />
          <AcceptOffer />
          <div className="ticket-actions">
            <GetTicketNumber />
            <ReturnTicket />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
