// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

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
    
    struct STNFlowData {
        string programa;
        string portaria;
        string titulo;
        string dataEmissao;
        string dataVencimento;
        uint256 quantidade;
        uint256 preco;
        uint256 valorFinanceiro;
        string aberturaContabil;
    }

    mapping(uint256 => STNFlowData) public stnFlows;

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

    function registerSTNFlow(
        uint256 tokenId,
        string memory programa,
        string memory portaria,
        string memory titulo,
        string memory dataEmissao,
        string memory dataVencimento,
        uint256 quantidade,
        uint256 preco,
        uint256 valorFinanceiro,
        string memory aberturaContabil
    ) external onlyOwner {
        stnFlows[tokenId] = STNFlowData({
            programa: programa,
            portaria: portaria,
            titulo: titulo,
            dataEmissao: dataEmissao,
            dataVencimento: dataVencimento,
            quantidade: quantidade,
            preco: preco,
            valorFinanceiro: valorFinanceiro,
            aberturaContabil: aberturaContabil
        });
    }

    function getSTNFlowData(uint256 tokenId) external view returns (STNFlowData memory) {
        return stnFlows[tokenId];
    }
}
