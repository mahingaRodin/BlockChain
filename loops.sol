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


//sum of digits in a number1
pragma solidity ^0.8.20;

contract SumDigits {
    function sumDigit(uint256 n) public pure returns (uint256) {
        uint256 sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
}

contract SumArray {
    function sumOfArray(uint256[] memory arr) public pure returns (uint256) {
        uint256 sum = 0;
        uint256 length = arr.length;

        for (uint256 i = 0; i < length; i++) {
            sum += arr[i];
        }
        return sum;
    }
}
