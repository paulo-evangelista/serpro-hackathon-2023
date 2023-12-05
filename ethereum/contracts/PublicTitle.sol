// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PublicTitle is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    IERC20 public drex;

    // counter para os ids das nfts emitidas
    uint256 private idCounter;

    // uri base para as nfts (e.g. https://ipfs.io/ipfs/)
    string public baseURI;

    // Quantos titulos ainda podem ser vendidos (SupplyMáximo - QuantidadeVendida)
    uint256 public availableSupply;

    // Define se o contrato já foi liquidado, ou seja, o vencimento já chegou e o governo já pagou todo mundo
    bool public wasLiquidated;

    // infos do asset em si (STN flow)
    string public titleName;
    string public titleSymbol;
    uint16 public annualProfitability;
    uint256 public unitPrice;
    string public program;
    string public lobby;
    uint64 public launchDate;
    uint64 public expirationDate;
    uint256 public amount;
    uint256 public financialAmount;
    string public accountingOpening;

    event mint(address indexed wallet, uint256 indexed tokenId);
    error noPermissionError(string message);
    error soulbondError(string message);

    // Mostra quantos titulos um investidor comprou no total.
    mapping(address => uint256) public investorBalances;
    // Mostra quanto deve ser pago para cada investidor no vencimento do titulo.
    // O valor que deve ser pago é calculado previamente pelo servidor e passado como argumento na função de mint.
    mapping(address => uint256) public investorsPayables;
    // array com o endereço de todos que já compraram um titulo
    address[] public investors;

    // permite apenas se o titulo não venceu
    modifier notExpired() {
        require(block.timestamp < expirationDate, "Contract expired!");
        _;
    }

    // permite apenas se o titulo venceu
    modifier expired() {
        require(block.timestamp >= expirationDate, "Contract not expired yet!");
        _;
    }

    constructor(
        string memory _titleName,
        string memory _titleSymbol,
        uint16 _annualProfitability,
        uint256 _unitPrice,
        string memory _program,
        string memory _lobby,
        uint64 _launchDate,
        uint64 _expirationDate,
        uint256 _amount,
        uint256 _financialAmount,
        string memory _accountingOpening,
        address _drexAddress
    ) ERC721(_titleName, _titleSymbol) Ownable(msg.sender) {
        // Dados estáticos do contrato em si
        titleName = _titleName;
        titleSymbol = _titleSymbol;
        annualProfitability = _annualProfitability;
        unitPrice = _unitPrice;
        program = _program;
        lobby = _lobby;
        launchDate = _launchDate;
        expirationDate = _expirationDate;
        amount = _amount;
        financialAmount = _financialAmount;
        accountingOpening = _accountingOpening;

        // dados dinamicos para emissão e permissão
        idCounter = 0;
        baseURI = "https://ipfs.io/ipfs/";
        availableSupply = amount;
        wasLiquidated = false;

        // endereço do token DREX
        drex = IERC20(_drexAddress);
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
    }

    function safeMint(

        address to,
        uint256 _amount,
        // endereço do contrato da corretora que autorizou o usuario
        uint256 _investorReturn,
        // uri do IPFS para a NFT
        string memory ipfsURI

    ) external notExpired {
        
        require(
            drex.transferFrom(to, owner(), _amount),
            "Transfer failed"
        );

        idCounter++;

        if (investorsPayables[to] == 0) {
            investors.push(to);
            investorsPayables[to] = _investorReturn;
        } else {
            investorsPayables[to] += _investorReturn;
        }

        availableSupply -= _amount;

        _safeMint(to, idCounter);
        _setTokenURI(idCounter, ipfsURI);
        emit mint(to, idCounter);
    }

    function liquidate() public payable expired onlyOwner {
        for (uint256 i = 0; i < investors.length; i++) {
            address userAddress = investors[i];
            uint256 payAmount = investorsPayables[userAddress];

            if (payAmount == 0) continue;

            require(
                drex.transferFrom(owner(), userAddress, payAmount),
                "Transfer failed"
            );

            investorsPayables[userAddress] = 0;
        }

        wasLiquidated = true;
    }

    function changeDrexAddress(address _newDrexAddress) public onlyOwner {
        drex = IERC20(_newDrexAddress);
    }

    // overrides para proibir a transferência

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(IERC721, ERC721) {
        if (from != address(0)) {
            revert soulbondError("This token cannot be tranfered");
        }
        return super.safeTransferFrom(from, to, tokenId, data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(IERC721, ERC721) {
        if (from != address(0)) {
            revert soulbondError("This token cannot be tranfered");
        }
        return super.transferFrom(from, to, tokenId);
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // OVERRIDES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

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
        uint128 __amount
    ) internal override(ERC721, ERC721Enumerable) {
        return super._increaseBalance(account, __amount);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
