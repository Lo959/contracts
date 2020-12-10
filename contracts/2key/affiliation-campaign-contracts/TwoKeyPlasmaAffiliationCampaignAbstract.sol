pragma solidity ^0.4.24;

import "../campaign-mutual-contracts/TwoKeyCampaignIncentiveModels.sol";
import "../campaign-mutual-contracts/TwoKeyCampaignAbstract.sol";

import "../interfaces/ITwoKeySingletoneRegistryFetchAddress.sol";
import "../interfaces/ITwoKeyMaintainersRegistry.sol";
import "../interfaces/ITwoKeyPlasmaRegistry.sol";
import "../interfaces/ITwoKeyPlasmaEventSource.sol";
import "../interfaces/ITwoKeyPlasmaReputationRegistry.sol";

import "../libraries/Call.sol";
import "../libraries/IncentiveModels.sol";
import "../libraries/MerkleProof.sol";
import "../interfaces/ITwoKeyPlasmaAffiliationCampaignsPaymentsHandler.sol";

contract TwoKeyPlasmaAffiliationCampaignAbstract is TwoKeyCampaignIncentiveModels, ArcToken {

    using SafeMath for uint256;
    using Call for *;

    IncentiveModel incentiveModel;  //Incentive model for rewards

    address public TWO_KEY_SINGLETON_REGISTRY;
    address public contractor; //contractor address

    string public publicMetaHash; // Ipfs hash of json campaign object
    string public privateMetaHash; // Ipfs hash of json sensitive (contractor) information

    // Internal contract values
    uint campaignStartTime;                         // Time when campaign start
    uint campaignEndTime;                           // Time when campaign ends
    uint totalBountyAddedForCampaign;               // Total tokens amount added as budget for campaign
    uint totalBountyDistributedForCampaign;         // Total bounty paid for rewards
    uint256 conversionQuota;  // maximal ARC tokens that can be passed in transferFrom

    uint public subscriptionEndDate;

    bool public isValidated;
    bool public isCampaignEndedByContractor;
    bool isCampaignInitialized; // Representing if campaign "constructor" was called

    address[] public activeInfluencers;                    // Active influencer means that he has at least on participation in successful conversion
    mapping(address => bool) isActiveInfluencer;           // Mapping which will say if influencer is active or not
    mapping(address => bool) public isConverter;

    mapping(address => uint256) internal referrerPlasma2AmountInProcessOfWithdrawal;
    mapping(address => uint256) internal referrerPlasma2TotalWithdrawn;
    mapping(address => uint256) internal referrerPlasma2TotalEarnings;                              // Total earnings for referrers
    mapping(address => uint256) internal referrerPlasmaAddressToCounterOfConversions;                   // [referrer][conversionId]
    mapping(address => mapping(uint256 => uint256)) internal referrerPlasma2EarningsPerConversion;      // Earnings per conversion
    mapping(address => address) internal public_link_key;
    mapping(address => address) internal received_from; // referral graph, who did you receive the referral from


    /**
     * ------------------------------------------------------------------------------------
     *                          MODIFIERS AND EVENTS
     * ------------------------------------------------------------------------------------
     */


    // @notice Modifier which allows only contractor to call methods
    modifier onlyContractor() {
        require(msg.sender == contractor);
        _;
    }


    // Modifier restricting calls only to maintainers
    modifier onlyMaintainer {
        require(isMaintainer(msg.sender));
        _;
    }

    modifier isSubscriptionActive {
        require(block.timestamp <= subscriptionEndDate);
        _;
    }

    modifier isCampaignNotEnded {
        require(isCampaignEndedByContractor == false);
        _;
    }

    modifier isCampaignValidated {
        require(isValidated == true);
        _;
    }

    /**
     * ------------------------------------------------------------------------------------
     *                          Internal contract functions
     * ------------------------------------------------------------------------------------
     */


    /**
     * @notice          Function to check address of contracts stored in TwoKeyPlasmaSingletonRegistry contract
     * @param           contractName is the name of the contract address is being requested
     */
    function getAddressFromTwoKeySingletonRegistry(
        string contractName
    )
    internal
    view
    returns (address)
    {
        return ITwoKeySingletoneRegistryFetchAddress(TWO_KEY_SINGLETON_REGISTRY)
        .getContractProxyAddress(contractName);
    }


    /**
     * @notice          Function to check if there's enough bounty to distribute for conversion
     * @param           bountyToPay is rewards for which is being checked if contract has enough
     *                  bounty available to support it
     */
    function isThereEnoughBounty(
        uint bountyToPay
    )
    internal
    view
    returns (bool)
    {
        return (totalBountyAddedForCampaign.sub(totalBountyDistributedForCampaign) >= bountyToPay);
    }

    /**
     * @notice          Function to check if the user is maintainer or not
     * @param           _address is the address of the user
     * @return          true/false depending if he's maintainer or not
     */
    function isMaintainer(
        address _address
    )
    internal
    view
    returns (bool)
    {
        address twoKeyPlasmaMaintainersRegistry = getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaMaintainersRegistry");
        return ITwoKeyMaintainersRegistry(twoKeyPlasmaMaintainersRegistry).checkIsAddressMaintainer(_address);
    }

    /**
     * @notice          Function to check if campaign is active in terms of time set
     */
    function isCampaignActiveInTermsOfTime()
    internal
    view
    returns (bool)
    {
        if(campaignStartTime <= block.timestamp && block.timestamp <= campaignEndTime) {
            return true;
        }
        return false;
    }

    /**
     * @dev             Transfer tokens from one address to another
     *
     * @param           _from address The address which you want to send tokens from ALREADY converted to plasma
     * @param           _to address The address which you want to transfer to ALREADY converted to plasma
     */
    function transferFrom(
        address _from,
        address _to
    )
    internal
    {

        require(balances[_from] > 0);

        uint arcsToSub = 1;

        balances[_from] = balances[_from].sub(1);
        balances[_to] = balances[_to].add(conversionQuota);
        totalSupply_ = totalSupply_.add(conversionQuota.sub(1));

        received_from[_to] = _from;
    }


    /**
     * @notice          Private function to set public link key to plasma address
     *
     * @param           me is the plasma address
     * @param           new_public_key is the new key user want's to set as his public key
     */
    function setPublicLinkKeyOf(
        address me,
        address new_public_key
    )
    internal
    {
        address old_address = public_link_key[me];
        if (old_address == address(0)) {
            public_link_key[me] = new_public_key;
        } else {
            require(old_address == new_public_key);
        }
        public_link_key[me] = new_public_key;
    }


    /**
      * @notice         Function which will unpack signature and get referrers, keys, and weights from it
      *
      * @param          sig is signature of the user
      * @param          _converter is the address of the converter
      */
    function getInfluencersKeysAndWeightsFromSignature(
        bytes sig,
        address _converter
    )
    internal
    view
    returns (address[],address[],address)
    {
        address old_address;
        assembly
        {
            old_address := mload(add(sig, 21))
        }

        old_address = old_address;
        address old_key = public_link_key[old_address];

        address[] memory influencers;
        address[] memory keys;
        (influencers, keys,) = Call.recoverSig(sig, old_key, _converter);

        require(
            influencers[influencers.length-1] == _converter
        );

        return (influencers, keys, old_address);
    }


    /**
     * @notice          Function to track arcs and make ref tree
     *
     * @param           sig is the signature user joins from
     * @param           _converter is the address of the converter

     */
    function distributeArcsBasedOnSignature(
        bytes sig,
        address _converter
    )
    internal
    {
        address[] memory influencers;
        address[] memory keys;
        address old_address;

        (influencers, keys,old_address) = getInfluencersKeysAndWeightsFromSignature(sig, _converter);

        uint i;
        address new_address;
        uint numberOfInfluencers = influencers.length;

        require(numberOfInfluencers <= 40);

        for (i = 0; i < numberOfInfluencers; i++) {
            new_address = influencers[i];

            if (received_from[new_address] == address(0)) {
                transferFrom(old_address, new_address);
            } else {
                require(received_from[new_address] == old_address);
            }
            old_address = new_address;

            if (i < keys.length) {
                setPublicLinkKeyOf(new_address, keys[i]);
            }
        }
    }


    /**
     * @notice 		    Function which will distribute arcs if that is necessary
     *
     * @param 		    _converter is the address of the converter
     * @param		    signature is the signature user is converting with
     *
     * @return 	        Distance between user and contractor
     */
    function distributeArcsIfNecessary(
        address _converter,
        bytes signature
    )
    internal
    returns (uint)
    {
        if(received_from[_converter] == address(0)) {
            distributeArcsBasedOnSignature(signature, _converter);
        }
        return getNumberOfUsersToContractor(_converter);
    }


    /**
     * @notice          Function to call TwoKeyPlasmaReputationRegistry contract and update
     *                  reputation points for the influencers after conversion is executed
     *
     * @param           converter is the address of the converter which got rejected
     */
    function updateReputationPointsOnConversionExecutedEvent(
        address converter
    )
    internal
    {
        ITwoKeyPlasmaReputationRegistry(getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaReputationRegistry"))
            .updateReputationPointsForExecutedConversionAffiliation(converter, contractor);
    }


    /**
     * @notice          Function to update rewards between influencers when conversion gets executed
     *
     * @param           _converter is the address of converter
     * @param           _conversionId is the ID of conversion
     * @param           _bountyForDistribution is the total bounty for distribution for that conversion
     */
    function updateRewardsBetweenInfluencers(
        address _converter,
        uint _conversionId,
        uint _bountyForDistribution
    )
    internal
    {
        //Get all the influencers
        address[] memory influencers = getReferrers(_converter);

        //Get array length
        uint numberOfInfluencers = influencers.length;

        uint i;
        uint reward;
        if(incentiveModel == IncentiveModel.VANILLA_AVERAGE) {
            reward = IncentiveModels.averageModelRewards(_bountyForDistribution, numberOfInfluencers);
            for(i=0; i<numberOfInfluencers; i++) {
                updateReferrerMappings(influencers[i], reward, _conversionId);
            }
        } else if (incentiveModel == IncentiveModel.VANILLA_AVERAGE_LAST_3X) {
            uint rewardForLast;
            // Calculate reward for regular ones and for the last
            (reward, rewardForLast) = IncentiveModels.averageLast3xRewards(_bountyForDistribution, numberOfInfluencers);
            if(numberOfInfluencers > 0) {
                //Update equal rewards to all influencers but last
                for(i=0; i<numberOfInfluencers - 1; i++) {
                    updateReferrerMappings(influencers[i], reward, _conversionId);
                }
                //Update reward for last
                updateReferrerMappings(influencers[numberOfInfluencers-1], rewardForLast, _conversionId);
            }
        } else if(incentiveModel == IncentiveModel.VANILLA_POWER_LAW) {
            // Get rewards per referrer
            uint [] memory rewards = IncentiveModels.powerLawRewards(_bountyForDistribution, numberOfInfluencers, 2);
            //Iterate through all referrers and distribute rewards
            for(i=0; i<numberOfInfluencers; i++) {
                updateReferrerMappings(influencers[i], rewards[i], _conversionId);
            }
        }
    }


    /**
     * @notice          Internal function to update referrer mappings
     * @param           referrerPlasma is referrer plasma address
     * @param           reward is the reward referrer received
     * @param           conversionId is the id of conversion for which influencer gets rewarded
     */
    function updateReferrerMappings(
        address referrerPlasma,
        uint reward,
        uint conversionId
    )
    internal
    {
        checkIsActiveInfluencerAndAddToQueue(referrerPlasma);
        referrerPlasma2TotalEarnings[referrerPlasma] = referrerPlasma2TotalEarnings[referrerPlasma].add(reward);
        referrerPlasma2EarningsPerConversion[referrerPlasma][conversionId] = reward;
        referrerPlasmaAddressToCounterOfConversions[referrerPlasma] = referrerPlasmaAddressToCounterOfConversions[referrerPlasma].add(1);
    }


    /**
     * @notice          Function to check if influencer is persisted on the contract and add him to queue
     * @param           _influencer is the address of influencer
     */
    function checkIsActiveInfluencerAndAddToQueue(
        address _influencer
    )
    internal
    {
        if(!isActiveInfluencer[_influencer]) {
            // Add influencer to array of influencers
            activeInfluencers.push(_influencer);
            // Mark that influencer is added
            isActiveInfluencer[_influencer] = true;
            // Add campaign to list of campaigns for this referrer
            ITwoKeyPlasmaAffiliationCampaignsPaymentsHandler(
                getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaAffiliationCampaignsPaymentsHandler")
            ).addCampaignToListOfReferrerCampaigns(_influencer);
        }
    }


    /**
     * @notice           Function to get ethereum address for passed plasma address
     * @param            _address is the address we're getting ETH address for
     */
    function ethereumOf(
        address _address
    )
    internal
    view
    returns (address)
    {
        address twoKeyPlasmaRegistry = getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaRegistry");
        return ITwoKeyPlasmaRegistry(twoKeyPlasmaRegistry).plasma2ethereum(_address);
    }


    /**
     * @notice          Internal function to get moderator fee percent
     * @return          The fee in percentage which is going to moderator -> for now it's undivisible integer
     */
    function getModeratorFeePercent()
    internal
    view
    returns (uint)
    {
        return ITwoKeyPlasmaRegistry(getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaRegistry")).getModeratorFee();
    }


    /**
     * ------------------------------------------------------------------------------------
     *                          Public setters
     * ------------------------------------------------------------------------------------
     */

    function increaseAmountWithdrawnFromContract(
        address referrer,
        uint amount
    )
    public
    {
        require(msg.sender == getAddressFromTwoKeySingletonRegistry("TwoKeyPlasmaAffiliationCampaignsPaymentsHandler"));

        // Require that referrer has enough rewards
        require(referrerPlasma2TotalWithdrawn[referrer].add(amount) <= referrerPlasma2TotalEarnings[referrer]);

        // Increase amount referrer withdrawn
        referrerPlasma2TotalWithdrawn[referrer] = referrerPlasma2TotalWithdrawn[referrer].add(amount);
    }

    /**
     * @notice Function to set or update public meta hash
     * @param _publicMetaHash is the hash of the campaign
     * @dev Only contractor can call this
     */
    function startCampaignWithInitialParams(
        string _publicMetaHash,
        string _privateMetaHash,
        address _publicKey
    )
    public
    onlyContractor
    {
        // This can be called only once
        publicMetaHash = _publicMetaHash;
        privateMetaHash = _privateMetaHash;
        setPublicLinkKeyOf(msg.sender, _publicKey);
    }


    /**
     * @notice  Function where contractor can update incentive model of campaign
     * @param   _model is new model contractor wants to use for the campaign
     */
    function updateIncentiveModel(
        IncentiveModel _model
    )
    public
    onlyContractor
    {
        incentiveModel = _model;
    }

    /**
     * @notice Function to allow updating public meta hash
     * @param _newPublicMetaHash is the new meta hash
     */
    function updateIpfsHashOfCampaign(
        string _newPublicMetaHash
    )
    public
    onlyContractor
    {
        publicMetaHash = _newPublicMetaHash;
    }

    /**
     * ------------------------------------------------------------------------------------
     *                          Public getters
     * ------------------------------------------------------------------------------------
     */

    /**
     * @notice 		    Function to get number of influencers between submimtted user and contractor
     * @param 		    _user is the address of the user we're checking information
     *
     * 				    Example: contractor -> user1 -> user2 -> user3
     *				    Result for input(user3) = 2
     * @return		    Difference between user -> contractor
     */
    function getNumberOfUsersToContractor(
        address _user
    )
    public
    view
    returns (uint)
    {
        uint counter = 0;
        while(received_from[_user] != contractor) {
            _user = received_from[_user];
            require(_user != address(0));
            counter ++;
        }
        return counter;
    }


    /**
     * @notice          Function to get public link key of an address
     * @param           me is the address we're checking public link key
     */
    function publicLinkKeyOf(
        address me
    )
    public
    view
    returns (address)
    {
        return public_link_key[me];
    }


    /**
     * @notice          Function to get balance of influencer for his plasma address
     * @param           _referrer is the plasma address of influencer
     * @return          balance in 2KEY wei's units
     */
    function getReferrerPlasmaBalance(
        address _referrer
    )
    public
    view
    returns (uint)
    {
        return referrerPlasma2TotalEarnings[_referrer].sub(referrerPlasma2TotalWithdrawn[_referrer]);
    }


    /**
     * @notice          Function to get referrers balances and total earnings
     * @param           _referrerPlasmaList the list of referrers
     */
    function getReferrersBalancesAndTotalEarnings(
        address[] _referrerPlasmaList
    )
    public
    view
    returns (uint256[], uint256[])
    {
        uint numberOfAddresses = _referrerPlasmaList.length;

        uint256[] memory referrersPendingPlasmaBalance = new uint256[](numberOfAddresses);
        uint256[] memory referrersTotalEarningsPlasmaBalance = new uint256[](numberOfAddresses);

        for (uint i=0; i<numberOfAddresses; i++) {
            address referrer = _referrerPlasmaList[i];

            referrersPendingPlasmaBalance[i] = referrerPlasma2TotalEarnings[referrer].sub(referrerPlasma2TotalWithdrawn[referrer]);
            referrersTotalEarningsPlasmaBalance[i] = referrerPlasma2TotalEarnings[referrer];
        }

        return (referrersPendingPlasmaBalance, referrersTotalEarningsPlasmaBalance);
    }


    /**
     * @notice          Function where maintainer will lock the contract
     */
    function lockContractFromMaintainer()
    public
    onlyMaintainer
    {
        isCampaignEndedByContractor = true;
    }


    /**
     * @notice          Function where maintainer will set on plasma network the total bounty amount
     *                  and how many tokens are paid per conversion for the influencers
     * @dev             This can be only called by maintainer, and only once.
     * @param           _totalBounty is the total bounty for this campaign
     */
    function setParamsForCampaign(
        uint _totalBounty,
        uint _subscriptionEndDate
    )
    public
    onlyMaintainer
    {
        require(isValidated == false);

        totalBountyAddedForCampaign = _totalBounty;
        subscriptionEndDate = _subscriptionEndDate;

        isValidated = true;
    }


    /**
     * @notice          Function to return referrers participated in the referral chain
     * @param           customer is the one who converted
     * @return          array of referrer plasma addresses
     */
    function getReferrers(
        address customer
    )
    public
    view
    returns (address[])
    {
        address influencer = customer;
        uint numberOfInfluencers = getNumberOfUsersToContractor(influencer);

        address[] memory influencers = new address[](numberOfInfluencers);

        while (numberOfInfluencers > 0) {
            influencer = getReceivedFrom(influencer);
            numberOfInfluencers--;
            influencers[numberOfInfluencers] = influencer;
        }

        return influencers;
    }


    /**
     * @notice          Function to get referrer balances, total earnings they have and number
     *                  of conversions created from their link
     *
     * @param           _referrerAddress is the address of the referrer (plasma address)
     * @param           _conversionIds is the array of conversion ids we want earnings for
     */
    function getReferrerBalanceAndTotalEarningsAndNumberOfConversions(
        address _referrerAddress,
        uint[] _conversionIds
    )
    public
    view
    returns (uint,uint,uint,uint[])
    {
        uint len = _conversionIds.length;
        uint[] memory earningsPerConversion = new uint[](len);

        for(uint i=0; i<len; i++) {
            uint conversionId = _conversionIds[i];
            // Since this value is only accessible from here, we won't change it in the state but in the getter
            earningsPerConversion[i] = referrerPlasma2EarningsPerConversion[_referrerAddress][conversionId];
        }

        return (
            referrerPlasma2TotalEarnings[_referrerAddress].sub(referrerPlasma2TotalWithdrawn[_referrerAddress]),
            referrerPlasma2TotalEarnings[_referrerAddress],
            referrerPlasmaAddressToCounterOfConversions[_referrerAddress],
            earningsPerConversion
        );
    }

    /**
     * @notice          Function to get available bounty at the moment
     */
    function getAvailableBounty()
    public
    view
    returns (uint)
    {
        return totalBountyAddedForCampaign.sub(totalBountyDistributedForCampaign);
    }


    /**
     * @notice          Function to return total added budget for the campaign
     */
    function getTotalAddedBudgetForCampaign()
    public
    view
    returns (uint)
    {
        return totalBountyAddedForCampaign;
    }


    /**
     * @notice          Function to get if address is joined on-chain or not
     * @param           _plasmaAddress is the plasma address of the user
     *                  It can be converter, contractor, or simply an influencer
     * @return          True if address has joined
     */
    function getAddressJoinedStatus(
        address _plasmaAddress
    )
    public
    view
    returns (bool)
    {
        if (_plasmaAddress == contractor || received_from[_plasmaAddress] != address(0)) {
            return true;
        }
        return false;
    }


    /**
     * @notice          Function to get all active influencers
     */
    function getActiveInfluencers(
        uint start,
        uint end
    )
    public
    view
    returns (address[])
    {
        address[] memory influencers = new address[](end-start);

        uint index = 0;
        uint i = 0;
        for(i = start; i < end; i++) {
            address influencer = activeInfluencers[i];
            influencers[index] = influencer;
            index++;
        }

        return influencers;
    }


    /**
     * @notice          Function to get number of active influencers
                        which is represented as the length of the array
                        they're stored in
     */
    function getNumberOfActiveInfluencers()
    public
    view
    returns (uint)
    {
        return activeInfluencers.length;
    }


    /**
     * @notice          Function to get super stats for an address which will include
     *                  if that address is an influencer, if he's a converter, also if he have joined the chain
                        and his ethereum address
     *
     * @return          tupled data
     */
    function getSuperStatistics(
        address _address
    )
    public
    view
    returns (bool,bool,bool,address)
    {
        bool isReferrer = isActiveInfluencer[_address];
        bool isAddressConverter = isConverter[_address];
        bool isJoined = getAddressJoinedStatus(_address);

        return (isReferrer, isAddressConverter, isJoined, ethereumOf(_address));
    }


    /**
     * @notice Getter for the referral chain
     * @param _receiver is address we want to check who he has received link from
     */
    function getReceivedFrom(
        address _receiver
    )
    public
    view
    returns (address)
    {
        return received_from[_receiver];
    }

}
