// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// interface para falar com o contrato da empresa (checar se o usuario foi autorizado)
interface IInstitutionContract {
    function checkIfUserHavePermission(address) external view returns (bool);
}

contract CustomPublicTitle is ERC721, ERC721URIStorage, Ownable {
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
    uint256 public annualProfitability;
    uint256 public unitPrice;
    uint256 public maturityDate;
    string public program;
    string public lobby;
    uint256 public launchDate;
    uint256 public expirationDate;
    uint256 public amount;
    uint256 public price;
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

    // checa se a corretora informada pelo usuario concedeu permissão a ele
    modifier userHasPermission(address InstitutionContractAddress) {
        IInstitutionContract externalContract = IInstitutionContract(
            InstitutionContractAddress
        );
        if (!externalContract.checkIfUserHavePermission(msg.sender)) {
            revert noPermissionError(
                "The informed institution did not authorize the msg.sender"
            );
        }
        _;
    }

    constructor(
        string memory _titleName,
        string memory _titleSymbol,
        uint256 _annualProfitability,
        uint256 _unitPrice,
        uint256 _maturityDate,
        string memory _program,
        string memory _lobby,
        uint256 _launchDate,
        uint256 _expirationDate,
        uint256 _amount,
        uint256 _price,
        uint256 _financialAmount,
        string memory _accountingOpening
    ) ERC721(_titleName, _titleSymbol) Ownable(msg.sender) {
        // Dados estáticos do contrato em si
        titleName = _titleName;
        titleSymbol = _titleSymbol;
        annualProfitability = _annualProfitability;
        unitPrice = _unitPrice;
        maturityDate = _maturityDate;
        program = _program;
        lobby = _lobby;
        launchDate = _launchDate;
        expirationDate = _expirationDate;
        amount = _amount;
        price = _price;
        financialAmount = _financialAmount;
        accountingOpening = _accountingOpening;

        // dados dinamicos para emissão e permissão
        idCounter = 0;
        baseURI = "https://ipfs.io/ipfs/";
        availableSupply = amount;
        wasLiquidated = false;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function safeMint(
        address to,
        uint256 _amount,
        // endereço do contrato da corretora que autorizou o usuario
        address institution,
        // valor que deve ser pago ao investidor quando o contrato vencer
        uint256 _investorReturn,
        // uri do IPFS para a NFT
        string memory ipfsURI
    ) external notExpired userHasPermission(institution) {
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

            require(payAmount > 0, "No balance to distribute");
            require(address(this).balance >= payAmount, "Insufficient funds");

            (bool sent, ) = userAddress.call{value: payAmount}("");
            require(sent, "Failed to send Ether");
            investorsPayables[userAddress] = 0;
        }

        wasLiquidated = true;
    }

    // overrides para probir a transferência

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(IERC721, ERC721) {
        if  (from != address(0) && to != address(0)) {
            revert soulbondError('This token cannot be tranfered');
        }
        return super.safeTransferFrom(from, to, tokenId, data);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(IERC721, ERC721) {
        if (from != address(0) && to != address(0)) {
            revert soulbondError('This token cannot be tranfered');
        }
        return super.transferFrom(from, to, tokenId);
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // OVERRIDES ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
