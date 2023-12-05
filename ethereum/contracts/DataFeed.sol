// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataFeed {
    AggregatorV3Interface internal ethToUsdDataFeed;

    /**
     * Network: Sepolia
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor() {
        ethToUsdDataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    /**
     * Converts USD price to BRL.
     */
    function convertUsdToBrl(int usdPrice) private pure returns (int) {
        int conversionRate = 204440; // Equivalent to 0.204440, adjusted for decimal places
        return (usdPrice * conversionRate) / 1000000;
    }

    /**
     * Returns the latest answer in both USD and BRL.
     */
    function getChainlinkDataFeedLatestAnswer()
        public
        view
        returns (int)
    {
        (
            /* uint80 roundID */,
            int price,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = ethToUsdDataFeed.latestRoundData();


        return price;
    }
}
