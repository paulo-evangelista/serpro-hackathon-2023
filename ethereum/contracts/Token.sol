// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IInstitutionContract {
    function minters(address) external view returns (bool);
}

contract Token is ERC721, Ownable {
    uint256 private idCounter;
    string public baseURI;
    string public titleName;
    string public titleSymbol;

    address public institutionContractAddress;
    IInstitutionContract public institutionContract;
    bool public institutionConfigured;

    event Mint(address indexed minter, address indexed to, uint256 tokenId);
    event NewInstitutionContractCreated(
        address indexed institutionContract,
        address indexed owner
    );

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

    modifier onlyInstitution() {
        require(
            institutions[msg.sender],
            "You don't have permission to transfer tokens"
        );
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        idCounter = 0;
        titleName = _name;
        titleSymbol = _symbol;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function mint(address to, uint256 _amount) external {
        idCounter++;
        _safeMint(to, idCounter);
        emit Mint(msg.sender, to, idCounter);
    }

    function registerSTNFlow(
        uint256 tokenId,
        string memory _program,
        string memory _lobby,
        uint256 _financialAmount,
        string memory _accountingOpening
    ) external onlyOwner {
        stnFlows[tokenId] = STNFlowData({
            program: _program,
            lobby: _lobby,
            titleName: titleName,
            launchDate: block.timestamp,
            expirationDate: block.timestamp,
            amount: 1,
            price: 0,
            financialAmount: _financialAmount,
            accountingOpening: _accountingOpening
        });
    }

    function getSTNFlowData(
        uint256 tokenId
    ) external view returns (STNFlowData memory) {
        return stnFlows[tokenId];
    }

    // function addInstitution(address account) external onlyOwner {
    //     // InstitutionContract newInstitution = new InstitutionContract(account);
    //     // newInstitution.transferOwnership(account);
    //     // institutions[address(newInstitution)] = true;
    //     // emit NewInstitutionContractCreated(address(newInstitution), account);
    //     institutions[account] = true;
    // }

    function removeInstitution(address account) external onlyOwner {
        institutions[account] = false;
    }

    function transferToken(
        address from,
        address to,
        uint256 tokenId
    ) external onlyInstitution onlyOwner {
        _safeTransfer(from, to, tokenId, "");
    }

    function addInstitution(
        address _institutionAddress
    ) external onlyOwner returns (address) {
        require(
            !institutionConfigured,
            "Institution contract address already configured"
        );
        institutions[_institutionAddress] = true;
        InstitutionContract newInstitution = new InstitutionContract(
            _institutionAddress
        );
        institutionContractAddress = address(newInstitution);
        institutionContract = IInstitutionContract(institutionContractAddress);
        institutionConfigured = true;
        return address(newInstitution);
    }

    function getMinter(address _minter) external view returns (bool) {
        require(
            institutionConfigured,
            "Institution contract address not configured yet"
        );
        return institutionContract.minters(_minter);
    }
}

contract InstitutionContract is Ownable {
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender], "Only minter can perform this action");
        _;
    }

    constructor(address institution) Ownable(institution) {}

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
        emit MinterAdded(_minter);
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
        emit MinterRemoved(_minter);
    }
}
