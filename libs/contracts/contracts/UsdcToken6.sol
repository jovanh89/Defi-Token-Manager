// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract UsdcToken6 is ERC20, ERC20Permit {
    constructor() ERC20("UsdcToken6", "TUCUSDC") ERC20Permit("UsdcToken6") {
    }

    function mint(address _address, uint256 _value) external {
        _mint(_address, _value);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}