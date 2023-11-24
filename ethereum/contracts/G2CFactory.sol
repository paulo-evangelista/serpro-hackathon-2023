// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract ERC20Factory is Ownable {
    event NewERC20Created(address indexed erc20Contract, string name, string symbol);

    constructor() Ownable(msg.sender) {}

    function createERC20(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        string memory baseURI
    ) external onlyOwner returns (address) {
        CustomERC20Token newERC20 = new CustomERC20Token(name, symbol, initialSupply, msg.sender);
        newERC20.setBaseURI(baseURI);
        emit NewERC20Created(address(newERC20), name, symbol);
        return address(newERC20);
    }
}

contract CustomERC20Token is ERC20, Ownable {
    uint256 private idCounter;
    string public baseURI;

    event Mint(address indexed minter, address indexed to, uint256 amount);

    struct TokenData {
        uint256 tokenId;
        address owner;
    }

    TokenData[] public allTokens;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) Ownable(owner){
        _mint(msg.sender, initialSupply);
        idCounter = initialSupply;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        idCounter++;
        _mint(to, amount);
        allTokens.push(TokenData(idCounter, to));
        emit Mint(msg.sender, to, amount);
    }

    function getAllTokens() public view returns (TokenData[] memory) {
        return allTokens;
    }
}
