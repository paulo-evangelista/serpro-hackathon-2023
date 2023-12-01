//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract IPCAOracle is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    address private oracleAddress;
    bytes32 private jobId;
    uint256 private fee;

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setOracleAddress(0x0FaCf846af22BCE1C7f88D1d55A038F27747eD2B);
        setJobId("a8356f48569c434eaa4ac5fcb4db5cc0");
        setFeeInHundredthsOfLink(0); // 0 LINK
    }

    // Send a request to the Chainlink oracle
    function request(string memory _date) public {
        Chainlink.Request memory req = buildOperatorRequest(
            jobId,
            this.fulfill.selector
        );

        // DEFINE THE REQUEST PARAMETERS (example)
        req.add("method", "GET");
        req.add("url", "https://oracle-api-ag0t.onrender.com/ipca");
        req.add("headers", '["content-type", "application/json"]');
        req.add("body", "");
        req.add("contact", "marcelo.feitoza@sou.inteli.edu.br");

        // PROCESS THE RESULT (example)
        req.add("path", _date);
        req.addInt("multiplier", 10 ** 18);

        // Send the request to the Chainlink oracle
        sendOperatorRequest(req, fee);
    }

    uint256 public response;

    function getResponse() public view returns (uint256) {
        return response;
    }

    // Receive the result from the Chainlink oracle
    event RequestFulfilled(bytes32 indexed requestId);

    function fulfill(
        bytes32 requestId,
        uint256 data
    ) public recordChainlinkFulfillment(requestId) {
        // Process the oracle response
        // emit RequestFulfilled(requestId);    // (optional) emits this event in the on-chain transaction logs, allowing Web3 applications to listen for this transaction
        response = data; // example value: 1875870000000000000000 (1875.87 before "multiplier" is applied)
    }

    // Update oracle address
    function setOracleAddress(address _oracleAddress) public onlyOwner {
        oracleAddress = _oracleAddress;
        setChainlinkOracle(_oracleAddress);
    }

    function getOracleAddress() public view onlyOwner returns (address) {
        return oracleAddress;
    }

    // Update jobId
    function setJobId(string memory _jobId) public onlyOwner {
        jobId = bytes32(bytes(_jobId));
    }

    function getJobId() public view onlyOwner returns (string memory) {
        return string(abi.encodePacked(jobId));
    }

    // Update fees
    function setFeeInJuels(uint256 _feeInJuels) public onlyOwner {
        fee = _feeInJuels;
    }

    function setFeeInHundredthsOfLink(
        uint256 _feeInHundredthsOfLink
    ) public onlyOwner {
        setFeeInJuels((_feeInHundredthsOfLink * LINK_DIVISIBILITY) / 100);
    }

    function getFeeInHundredthsOfLink()
        public
        view
        onlyOwner
        returns (uint256)
    {
        return (fee * 100) / LINK_DIVISIBILITY;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function getLinkBalance() public view returns (uint256) {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());

        return link.balanceOf(address(this));
    }
}
