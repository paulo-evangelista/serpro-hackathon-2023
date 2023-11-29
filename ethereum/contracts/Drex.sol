// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// // ------ Feito com amor para o hackathon Serpro: Tokenização do tesouro nacional.
// // ------ Por Inteli Blockchain

contract RealDigital is ERC20, Ownable {

    constructor(address initialOwner)
        ERC20("Real Digital", "DREX")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}