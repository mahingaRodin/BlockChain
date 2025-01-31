// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract localVariableExample {
//     function sum() public pure returns (uint) {
//         uint a = 5;
//         uint b = 10;

//         return a + b;
//     }
// }

// contract Test {
//     address public admin;

//     constructor() {
//         admin = msg.sender;
//     }
// }


// contract PublicExample {
//     uint  public number = 100;

//     function setNumber(uint _num) public {
//         number = _num;
//     }
// }

// contract varScopeEx {
//     uint public publicVar = 1;
//     uint private privateVar = 2;
//     uint internal internalVar = 3;

//     function getPrivateVar() public view returns (uint) {
//         return  privateVar;
//     }
// }

// contract DerivedContract is varScopeEx {
//     function getInternalVar() public view returns (uint) {
//         return internalVar;
//     }
// }


pragma solidity ^0.8.0;

contract UnsignedExample {
    uint public defaultUint = 100;
    uint8 public smallUint = 255;
    uint16 public mediumInt = 65535;

    function add(uint _a, uint _b) public  pure returns (uint) {
        return   _a + _b;
    }
}


pragma solidity ^0.8.0;

contract SignedExample {
    int public defaultInt = -100;
    int8 public smallInt = -128;
    int16 public mediumInt = 32767;

    function substract(int _a, int _b) public pure returns (int) {
        return _a - _b;
    }
}


pragma solidity ^0.8.0;

contract MixedExample {
    uint public positiveNumber = 10;
    int public signedNumber = -5;

    function  mixOperations(uint _x, int _y) public pure returns (int ) {
        int result = int(_x) + _y;
        return  result;
    }
}



