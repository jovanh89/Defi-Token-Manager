// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract DaiToken18 is ERC20, ERC20Permit {
    constructor() ERC20("DaiToken18", "TUCUDAI") ERC20Permit("DaiToken18") {}

    function mint(address _address, uint256 _value) external {
        _mint(_address, _value);
    }
}