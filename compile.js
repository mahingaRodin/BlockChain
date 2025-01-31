const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Path to the Solidity file
const filePath = path.resolve(__dirname, 'MyContract.sol');
const source = fs.readFileSync(filePath, 'utf8');

// Compile the Solidity code
const input = {
    language: 'Solidity',
    sources: {
        'MyContract.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output.contracts['MyContract.sol']);
