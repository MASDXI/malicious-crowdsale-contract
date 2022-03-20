// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Crowdsale is Ownable, ReentrancyGuard, Pausable {
    IERC20 private _tokenA;
    IERC20 private _tokenB;
    uint256 private _totalSupply;

    event Buy(address account, uint256 amount);

    constructor(IERC20 tokenA, IERC20 tokenB) {
        _pause();
        _tokenA = tokenA;
        _tokenB = tokenB;
        _tokenB.approve(address(tokenA), type(uint256).max);
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }

    function buy(uint256 amount) external nonReentrant whenNotPaused {
        address sender = _msgSender();
        require(
            (_totalSupply + amount) <= _tokenA.totalSupply(),
            "buying amount exceed"
        );
        _totalSupply = _totalSupply + amount;
        _tokenB.transferFrom(sender, address(this), amount);
        _tokenA.transfer(sender, amount);
        emit Buy(sender, amount);
    }

    function withdraw() external onlyOwner {
        address sender = _msgSender();
        require(
            _totalSupply == _tokenA.totalSupply(),
            "can't withdraw before sell end"
        );
        uint256 balance = _tokenB.balanceOf(address(this));
        _tokenB.transfer(
            sender,
            balance
        );
    }
}
