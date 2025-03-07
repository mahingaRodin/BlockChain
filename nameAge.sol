// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract nameAge {
    string public name ;
    int256 public age ;

    function setUser() public  {
        name = "Rodin";
        age = 17;
    }

    function retrievUser() public view returns (string memory, int) {
        return (name, age);
    }

}