// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract whileLoop{
    function sumNum(uint n) public pure returns (uint) {
        uint sum = 0;
        uint i = 1;

        while(i <= n) {
            sum += i;
            i++;
        }
        return sum;
    }
}


//sum of digits in a number
contract sumDigits {
    function sumDigit(uint n) public pure returns (uint) {
        uint sum = 0;
        while (true) {
            sum += n % 10;
            n /= 10;

            if(n == 0) {
                break ;
            }
        }
        return sum;
    }
}

// sum of an array

contract sum {
    function sumOfArray(uint[] memory arr)
}