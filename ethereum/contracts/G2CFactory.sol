// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract G2CFactory is Ownable {
    event NewG2CCreated(address indexed g2cContract, string name, string symbol);

    constructor() Ownable(msg.sender) {}

    function createG2C(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) external onlyOwner returns (address) {
        G2C newG2C = new G2C(name, symbol, baseURI, msg.sender);
        emit NewG2CCreated(address(newG2C), name, symbol);
        return address(newG2C);
    }
}

contract G2C is ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Burnable, Ownable {
    uint256 private idCounter;
    string public baseURI;

    event Mint(address indexed wallet, uint256 indexed tokenId);
    error soulbondError(string message);

    struct TokenData {
        uint256 tokenId;
        address owner;
    }   

    TokenData[] public allTokens;

    constructor(
        string memory name,
        string memory symbol,
        string memory __baseURI,
        address owner
    ) ERC721(name, symbol) Ownable(owner) {
        idCounter = 0;
        baseURI = __baseURI;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
    }

    function safeMint(
        address to,
        string memory tokenUri
    ) public onlyOwner returns (uint256) {
        idCounter++;
        _safeMint(to, idCounter);
        _setTokenURI(idCounter, tokenUri);
        allTokens.push(TokenData(idCounter, to));
        emit Mint(to, idCounter);
        return idCounter;
    }

    function getAllTokens() public view returns (TokenData[] memory) {
        return allTokens;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(IERC721, ERC721) {
        if  (from != address(0) && to != address(0)) {
            revert soulbondError('This token cannot be transferred');
        }
        return super.safeTransferFrom(from, to, tokenId, data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(IERC721, ERC721) {
        if (from != address(0) && to != address(0)) {
            revert soulbondError('This token cannot be transferred');
        }
        return super.transferFrom(from, to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _increaseBalance(
        address account,
        uint128 amount
    ) internal override(ERC721, ERC721Enumerable) {
        return super._increaseBalance(account, amount);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
