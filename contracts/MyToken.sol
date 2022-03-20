// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    bool private _initialize;
    uint256 private constant INITIAL_FUND = 100000000 * (10 ** 18);
    address private _crowdSale;

    // solhint-disable-next-line
    constructor() ERC20("MyToken", "MKT") {}

    modifier init() {
        require(!_initialize, "already initialized");
        _;
    }

    function initialize(address token)
        external
        onlyOwner
        init
    {
        _initialize = true;
        _crowdSale = token;
        _mint(_crowdSale, INITIAL_FUND);
    }

    function batchTransfer(address[] memory accounts, uint256[] memory amounts)
        external
        returns (bool)
    {
        _batchTransfer(accounts, amounts);
        return true;
    }
}
