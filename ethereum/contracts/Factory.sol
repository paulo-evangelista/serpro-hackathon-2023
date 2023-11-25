// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Token.sol";

contract Factory is Ownable {
    event NewERC721Created(
        address indexed erc721Contract,
        string name,
        string symbol
    );

    mapping(uint256 => address) public childContracts;
    uint256 public childContractCount;

    event ChildContractAdded(
        uint256 indexed id,
        address indexed contractAddress
    );

    constructor() Ownable(msg.sender) {
        childContractCount = 0;
    }

    function createERC721(
        string memory _name,
        string memory _symbol,
        string memory baseURI
    ) external onlyOwner returns (address) {
        CustomERC721Token newERC721 = new CustomERC721Token(_name, _symbol);
        newERC721.setBaseURI(baseURI);
        childContracts[childContractCount] = address(newERC721);
        emit NewERC721Created(address(newERC721), _name, _symbol);
        emit ChildContractAdded(childContractCount, address(newERC721));
        childContractCount++;
        return address(newERC721);
    }

    // Function to get a child contract's address by ID
    function getChildContract(uint256 id) external view returns (address) {
        require(id < childContractCount, "Invalid ID");
        return childContracts[id];
    }

    function mint(
        uint256 childId,
        address to,
        uint256 amount
    ) external onlyOwner {
        require(childId < childContractCount, "Invalid child ID");
        require(to != address(0), "Cannot mint to the zero address");

        // Get the child contract instance
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );

        // Call the mint function of the child contract
        childContract.mint(to, amount);
    }

    function setBaseURIFromFactory(
        uint256 childId,
        string memory newURI
    ) external onlyOwner {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        childContract.setBaseURI(newURI);
    }

    function registerSTNFlowFromFactory(
        uint256 childId,
        uint256 tokenId,
        string memory _program,
        string memory _lobby,
        uint256 _financialAmount,
        string memory _accountingOpening
    ) external onlyOwner {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        childContract.registerSTNFlow(
            tokenId,
            _program,
            _lobby,
            _financialAmount,
            _accountingOpening
        );
    }

    function removeInstitutionFromFactory(
        uint256 childId,
        address account
    ) external onlyOwner {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        childContract.removeInstitution(account);
    }

    function transferTokenFromFactory(
        uint256 childId,
        address from,
        address to,
        uint256 tokenId
    ) external onlyOwner {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        childContract.transferToken(from, to, tokenId);
    }

    function addInstitutionFromFactory(
        uint256 childId,
        address _institutionAddress
    ) external onlyOwner returns (address) {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        return childContract.addInstitution(_institutionAddress);
    }

    function getMinterFromFactory(
        uint256 childId,
        address _minter
    ) external view returns (bool) {
        require(childId < childContractCount, "Invalid child ID");
        CustomERC721Token childContract = CustomERC721Token(
            childContracts[childId]
        );
        return childContract.getMinter(_minter);
    }
}
