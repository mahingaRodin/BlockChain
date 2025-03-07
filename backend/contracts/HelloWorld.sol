// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
    string public message;

    // Constructor to initialize the contract with a message
    constructor(string memory _message) {
        message = _message;
    }

    // Function to update the message
    function setMessage(string memory _message) public {
        message = _message;
    }

    // Function to retrieve the message (default public getter)
    function getMessage() public view returns (string memory) {
        return message;
    }
}
