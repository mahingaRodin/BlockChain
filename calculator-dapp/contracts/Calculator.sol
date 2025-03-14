// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Calculator {

    event Result(uint result);

    // Removed 'pure' and 'view' modifiers
    function add(uint a, uint b) public returns (uint) {
        uint result = a + b;
        emit Result(result);
        return result;
    }

    function subtract(uint a, uint b) public returns (uint) {
        uint result = a - b;
        emit Result(result);
        return result;
    }

    function multiply(uint a, uint b) public returns (uint) {
        uint result = a * b;
        emit Result(result);
        return result;
    }

    function divide(uint a, uint b) public returns (uint) {
        require(b != 0, "Cannot divide by zero.");
        uint result = a / b;
        emit Result(result);
        return result;
    }
}
