// SPDX-License-Identifier: ISC

pragma solidity ^0.8.17;

contract TicketSale
{
    address public manager;
    uint public ticketAmount;
    uint public ticketPrice;

    constructor()
    {
        manager = msg.sender;
        ticketAmount = 100000;
        ticketPrice = 1000;
    }

    struct ticket
    {
        uint ticketID;
        address ticketAddress;
        bool isSold;
    }

    mapping (address => address) public swap;
    mapping (address => ticket) public tickets;


    function buyTicket(uint ticketID) public payable returns(ticket memory)
    {
        uint cost = ticketPrice;
        address caller = msg.sender;
        require(msg.value >= cost, "insufficient funds");
        require(ticketAmount >= 1, "no more tickets");

        (bool success,) = payable(manager).call{value: msg.value}("");
        require(success, "transfer failed");


        ticketAmount -= 1;
        ticket memory thisTicket = ticket(ticketID, caller, true);
        tickets[caller] = thisTicket;
        return(thisTicket);
    }

    function getTicketOf(address person) public view returns(uint)
    {      
        return tickets[person].ticketID;
    }

    function returnTicket(address payable returnAddress) public payable
    {
        address caller = msg.sender;
        require(caller == manager, "UNAUTHORIZED ACTION");

        require(tickets[returnAddress].ticketAddress == returnAddress, "The entered address does not own any tickets.");

        uint refundAmount = (ticketPrice * 9) / 10;

        (bool success,) = payable(manager).call{value: refundAmount}("");
        require(success, "TRANSFER FAILURE");
        

        delete tickets[returnAddress];

        ticketAmount += 1;
    }

    function changeOwner(address newOwner) public
    {
        address caller = msg.sender;

        tickets[caller].ticketAddress = newOwner;
    }

    function offerSwap(address partner) public
    {
        address caller = msg.sender;

        require(tickets[caller].ticketAddress == caller, "You do not own a ticket.");
        require(tickets[partner].ticketAddress == partner, "Partner does not own a ticket.");
        
        swap[partner] = caller;
    }

    function acceptSwapOffer(address partner) public
    {
        address caller = msg.sender;

        require(tickets[caller].ticketAddress == caller, "You do not own a ticket");
        require(tickets[partner].ticketAddress == partner, "Partner does not own a ticket");
        require(swap[caller] == partner, "No swap offer from partner");
        
        uint callerTicketID = tickets[caller].ticketID;
        address callerAddress = tickets[caller].ticketAddress;
        uint partnerTicketID = tickets[partner].ticketID;
        address partnerAddress = tickets[partner].ticketAddress;

        delete tickets[caller];
        delete tickets[partner];

        ticket memory callersNewTicket = ticket(partnerTicketID, callerAddress, true);
        tickets[caller] = callersNewTicket;
        ticket memory partnersNewTicket = ticket(callerTicketID, partnerAddress, true);
        tickets[partner] = partnersNewTicket;

        delete swap[caller];
    }
}