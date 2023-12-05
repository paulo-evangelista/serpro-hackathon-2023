// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./CustomPublicTitle.sol";

contract InstitutionContract is Ownable {
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender], "Only minter can perform this action");
        _;
    }

    constructor(address institution) Ownable(institution){}

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
        emit MinterAdded(_minter);
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
        emit MinterRemoved(_minter);
    }

    function checkIfUserHavePermission(address _investor) external view returns (bool) {
        return minters[_investor];
    }
}