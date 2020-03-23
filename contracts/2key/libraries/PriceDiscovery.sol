pragma solidity ^0.4.24;

import "./SafeMath.sol";

/**
 * @notice              Library which will be used to handle price discovery mechanism of 2KEY token
 * @author              Nikola Madjarevic (@madjarevicn)
 */
library PriceDiscovery {


    using SafeMath for uint;



    /**
     * @notice          Function to calculate token price based on amount of tokens in the pool
     *                  currently and initial worth of pool in USD
     *
     * @param           poolInitialAmountInUSD (wei) is the amount how much all tokens in pool should be worth
     * @param           amountOfTokensLeftInPool (wei) is the amount of tokens left in the pool after somebody
     *                  bought them
     * @return          new token price in USD  -> in wei units
     */
    function recalculatePrice(
        uint poolInitialAmountInUSD,
        uint amountOfTokensLeftInPool
    )
    public
    pure
    returns (uint)
    {
        return (poolInitialAmountInUSD.mul(10**18)).div(amountOfTokensLeftInPool);

    }



    /**
     * @notice          Function to calculate how many iterations to recompute price we need
     *
     * @param           amountOfUSDSpendingForBuyingTokens is the dollar amount user is spending
     *                  to buy the tokens
     * @param           tokenPriceBeforeBuying is the price of the token when user expressed
     *                  a will to buy the tokens
     * @param           totalAmountOfTokensInThePool is the amount of the tokens that are currently present in the pool
     * @return          tuple containing number of iterations and how many dollars will be spent per iteration
     */
    function calculateNumberOfIterationsNecessary(
        uint amountOfUSDSpendingForBuyingTokens,
        uint tokenPriceBeforeBuying,
        uint totalAmountOfTokensInThePool
    )
    public
    pure
    returns (uint, uint)
    {
        uint HUNDRED_WEI = 100*(10**18);
        uint ONE_WEI = 10**18;

        uint numberOfIterations = 1;

        if(amountOfUSDSpendingForBuyingTokens > HUNDRED_WEI) {
            // Amount of tokens that user would receive in case he bought for the whole money at initial price
            uint amountOfTokensToBeBought = amountOfUSDSpendingForBuyingTokens.mul(10**18).div(tokenPriceBeforeBuying);
            // Percentage of the current amount in the pool in tokens user is buying
            uint percentageOfThePoolWei = amountOfTokensToBeBought.mul(HUNDRED_WEI).div(totalAmountOfTokensInThePool);

            if(percentageOfThePoolWei < ONE_WEI) {
                // Case less than 1%
                numberOfIterations = 5;

            } else if(percentageOfThePoolWei < ONE_WEI.mul(10)) {
                // Case between 1% and 10%
                numberOfIterations = 10;
            } else if(percentageOfThePoolWei < ONE_WEI.mul(30)) {
                // Case between 10% and 30%
                numberOfIterations = 30;
            } else {
                // Cases where 30% or above
                numberOfIterations = 100;
            }
        }

        return (numberOfIterations, amountOfUSDSpendingForBuyingTokens.div(numberOfIterations));
    }


    function calculatePercentageOfThePoolWei(
        uint amountSpendingToBuyTokens,
        uint totalAmountOfTokensInThePool,
        uint tokenPriceBeforeBuying
    )
    public
    pure
    returns (uint,uint)
    {
        uint HUNDRED_WEI = 100*(10**18);

        uint amountOfTokensToBeBought = amountSpendingToBuyTokens.mul(10**18).div(tokenPriceBeforeBuying);
        // Percentage of the current amount in the pool in tokens user is buying
        uint percentageOfThePoolWei = amountOfTokensToBeBought.mul(HUNDRED_WEI).div(totalAmountOfTokensInThePool);

        return (amountOfTokensToBeBought, percentageOfThePoolWei);
    }



    /**
     *
     */
    function calculateTotalTokensUserIsGetting(
        uint amountOfUSDSpendingForBuyingTokens,
        uint tokenPriceBeforeBuying,
        uint totalAmountOfTokensInThePool,
        uint poolInitialWorthUSD
    )
    public
    pure
    returns (uint,uint)
    {
        uint totalTokensBought;

        uint numberOfIterations;
        uint amountBuyingPerIteration;

        (numberOfIterations, amountBuyingPerIteration) = calculateNumberOfIterationsNecessary(
            amountOfUSDSpendingForBuyingTokens,
            tokenPriceBeforeBuying,
            totalAmountOfTokensInThePool
        );

        uint index;
        uint amountOfTokensReceived;
        uint newPrice = tokenPriceBeforeBuying;

        for(index = 0; index < numberOfIterations; index ++) {
            // Function which will calculate the amount of tokens we got for specific iteration
            // and also besides that what will be the new token price
            (amountOfTokensReceived, newPrice, totalAmountOfTokensInThePool) = calculateAmountOfTokensPerIterationAndNewPrice(
                totalAmountOfTokensInThePool,
                newPrice,
                amountBuyingPerIteration,
                poolInitialWorthUSD
            );
            // Update total tokens which user have bought
            totalTokensBought = totalTokensBought.add(amountOfTokensReceived);
        }

        return (totalTokensBought, newPrice);
    }



    function buyTokens(
        uint amountOfUSDSpendingForBuyingTokens,
        uint tokenPriceBeforeBuying,
        uint totalAmountOfTokensInThePool,
        uint poolInitialWorthUSD
    )
    public
    pure
    returns (uint,uint,uint)
    {
        uint totalTokensBought;
        uint newTokenPrice;

        (totalTokensBought, newTokenPrice) = calculateTotalTokensUserIsGetting(
            amountOfUSDSpendingForBuyingTokens,
            tokenPriceBeforeBuying,
            totalAmountOfTokensInThePool,
            poolInitialWorthUSD
        );

        uint averageTokenPriceForPurchase = amountOfUSDSpendingForBuyingTokens.mul(10**18).div(totalTokensBought);

        return (totalTokensBought, averageTokenPriceForPurchase, newTokenPrice);
    }



    /**
     * @notice          Function to calculate amount of tokens per iteration and what will be the new price
     * @param           totalAmountOfTokensInThePool is the total amount of tokens in the pool at the moment
     * @param           tokenPrice is the price of the token at the moment
     * @param           iterationAmount is the amount user is spending in this iteration
     */
    function calculateAmountOfTokensPerIterationAndNewPrice(
        uint totalAmountOfTokensInThePool,
        uint tokenPrice,
        uint iterationAmount,
        uint poolInitialWorthUSD
    )
    public
    pure
    returns (uint,uint,uint)
    {
        // Calculate amount of tokens user is getting
        uint amountOfTokens = iterationAmount.mul(10**18).div(tokenPrice);
        // Calculate the new price for the pool
        uint tokensLeftInThePool = totalAmountOfTokensInThePool.sub(amountOfTokens);
        // The new price after the tokens are being bought
        uint newPrice = recalculatePrice(poolInitialWorthUSD, tokensLeftInThePool);

        return (amountOfTokens,newPrice,tokensLeftInThePool);
    }
}
