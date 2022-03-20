// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDT is ERC20, Ownable {
    uint256 private constant INITIAL_FUND = 100_000_000 ether;

    constructor(address mock) ERC20("Tether", "USDT") {
        _mint(mock, INITIAL_FUND); // add initial fund for mock account
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}
