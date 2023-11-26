// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

interface IInstitutionContract {
    function minters(address) external view returns (bool);
}

contract CustomPublicTitle is ERC721, Ownable {
    uint256 private idCounter;
    string public baseURI;
    string public titleName;
    string public titleSymbol;
    uint256 public annualProfitability;
    uint256 public unitPrice;
    uint256 public maturityDate;

    address public institutionContractAddress;
    IInstitutionContract public institutionContract;
    bool public institutionConfigured;

    event Mint(address indexed minter, address indexed to, uint256 tokenId);
    event NewInstitutionContractCreated(address indexed institutionContract, address indexed owner);

    struct STNFlowData {
        string program;
        string lobby;
        string titleName;
        uint256 launchDate;
        uint256 expirationDate;
        uint256 amount;
        uint256 price;
        uint256 financialAmount;
        string accountingOpening;
    }

    mapping(uint256 => STNFlowData) public stnFlows;
    mapping(address => bool) public institutions;
    mapping(uint256 => mapping(address => uint256)) public investorBalances;
    mapping(uint256 => address[]) public investors;
    mapping(uint256 => uint256) public govAmounts;

    modifier onlyInstitution() {
        require(institutions[msg.sender], "You don't have permission to transfer tokens");
        _;
    }

    modifier notExpired(uint256 tokenId) {
        require(block.timestamp < stnFlows[tokenId].expirationDate, "Contract expired!");
        _;
    }

    modifier expired(uint256 tokenId) {
        require(block.timestamp >= stnFlows[tokenId].expirationDate, "Contract not expired yet!");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _annualProfitability,
        uint256 _unitPrice,
        uint256 _maturityDate
    ) ERC721(_name, _symbol) Ownable(msg.sender){
        idCounter = 0;
        titleName = _name;
        titleSymbol = _symbol;
        _annualProfitability = annualProfitability;
        _unitPrice = unitPrice;
        _maturityDate = maturityDate;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function mint(address to, uint256 _amount, uint256 tokenId) external notExpired(tokenId)  {
        idCounter++;
        to = owner();
        _safeMint(to, idCounter);
        investors[idCounter].push(to);
        if (_amount > 0) {
            investorBalances[idCounter][owner()] += _amount; 
            govAmounts[idCounter] = _amount; 
        }
        investorBalances[idCounter][to] += _amount;
        emit Mint(msg.sender, to, idCounter);
    }

    function registerSTNFlow(
        uint256 tokenId,
        string memory _program,
        string memory _lobby,
        uint256 _financialAmount,
        string memory _accountingOpening,
        uint256 _amount
    ) external onlyOwner {
        stnFlows[tokenId] = STNFlowData({
            program: _program,
            lobby: _lobby,
            titleName: titleName,
            launchDate: block.timestamp,
            expirationDate: maturityDate, 
            amount: _amount,
            price: unitPrice,
            financialAmount: _financialAmount,
            accountingOpening: _accountingOpening
        });
    }

    function getSTNFlowData(uint256 tokenId) external view onlyOwner returns (STNFlowData memory) {
        return stnFlows[tokenId];
    }

    function removeInstitution(address account) external onlyOwner {
        institutions[account] = false;
    }

    function transferToken(address from, address to, uint256 tokenId) external onlyInstitution onlyOwner {
        _safeTransfer(from, to, tokenId, "");
    }

    function addInstitution(address _institutionAddress) external onlyOwner returns (address) {
        require(!institutionConfigured, "Institution contract address already configured");
        institutions[_institutionAddress] = true;
        InstitutionContract newInstitution = new InstitutionContract(_institutionAddress);
        institutionContractAddress = address(newInstitution);
        institutionContract = IInstitutionContract(institutionContractAddress);
        institutionConfigured = true;
        return address(newInstitution);
    }

    function getMinter(address _minter) external view returns (bool) {
        require(institutionConfigured, "Institution contract address not configured yet");
        return institutionContract.minters(_minter);
    }

    function liquidate(uint256 tokenId) external payable onlyOwner expired(tokenId) {
        uint256 amountToPay = stnFlows[tokenId].financialAmount;
        require(msg.value == amountToPay, "Incorrect payment amount");

        address[] memory investorsList = investors[tokenId];
        for (uint256 i = 0; i < investorsList.length; i++) {
            address investor = investorsList[i];
            uint256 userInvestment = investorBalances[tokenId][investor];
            uint256 userPayment = (userInvestment * (annualProfitability / 12)) / 100; 
            if (userPayment > 0) {
                investorBalances[tokenId][investor] = 0;
                payable(investor).transfer(userPayment);
            }
        }

        uint256 govAmount = govAmounts[tokenId];
        if (govAmount > 0) {
            payable(owner()).transfer(govAmount);
        }
    }
}