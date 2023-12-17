const path = require('path');
const fs = require('fs');
const solc = require('solc');
//const solc = require('solc@0.4.17');

const contractPath = path.resolve(__dirname, 'contracts', 'TicketSale.sol');
const source = fs.readFileSync(contractPath, 'utf8');

//console.log(solc.compile(source, 1).contracts[':Ecommerce']);

//module.exports = solc.compile(source, 1).contracts[':Ecommerce'];

let input = {
  language: "Solidity",
  sources: {
    "TicketSale.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};
// const output = solc.compile(output, 1);
const output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log(output)
//console.log(output.contracts["Lottery.sol"].Lottery);
//onst bytecode = output.contracts['Ecommerce.sol'].Inbox.evm.bytecode.object;
//console.log(bytecode);
const contracts = output.contracts["TicketSale.sol"];

for (let contractName in contracts) {
    const contract = contracts[contractName];
    module.exports= {"abi":contract.abi,"bytecode":contract.evm.bytecode.object};
	console.log(JSON.stringify(contract.abi))
}