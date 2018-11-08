pragma solidity ^0.4.24;

import './TwoKeyContract.sol';
import './TwoKeySignedContract.sol';
import "./CallCutted.sol";
import "./TwoKeyVoteToken.sol";

contract TwoKeyWeightedVoteContract is StandardToken, Ownable, CallCutted {

    event Member(address _x);
    address public erc20_token_sell_contract;
    string public description;
    address public decentralizedNation;
    bool public valid = false;

    function setValid() public {
        require(msg.sender == decentralizedNation);
        valid = true;
    }

    constructor(string _description, address _decentralizedNation) Ownable() public {
        balances[msg.sender] = 1000000000000000000;
        erc20_token_sell_contract = new TwoKeyVoteToken(_decentralizedNation);
        description = _description;
        decentralizedNation = _decentralizedNation;
    }

    modifier onlyDecentralizedNation {
        require(msg.sender == address(decentralizedNation));
        _;
    }

    function getDynamicData() public view returns (uint,uint,uint,uint,uint,uint) {
        return (voted_yes,voted_no, total_vote, weighted_yes,weighted_no, total_weight);
    }

    function getAllVoters() public view returns (address[]) {
        return allVoters;
    }

    address [] public allVoters;
    uint public quota = 100000000000;
    uint public cost = 10000000000000000;
    mapping(address => uint)  public voted_weight;
    mapping(address => bool) public weightedYes;
    mapping(address => bool)  public voted;
    uint public voted_yes;
    uint public voted_no;
    uint public total_vote;  // this can be bigger than voted_yes+voted_no because of abstain votes
    uint public weighted_yes;
    uint public weighted_no;
    uint public total_weight;  // this can be bigger than weighted_yes+weighted_no because of lack of voting coins

    mapping (address => address) public received_from;
    mapping(address => uint256) public influencer2cut;

    // the 2key link generated by the owner of this contract contains a secret which is a private key,
    // this is the public part of this secret
    mapping(address => address)  public public_link_key;

    function setPublicLinkKey(address _public_link_key) public {
        address owner_influencer = msg.sender;
        require(balanceOf(owner_influencer) > 0,'no ARCs');
        require(public_link_key[owner_influencer] == address(0),'public link key already defined');
        public_link_key[owner_influencer] = _public_link_key;
    }



    function transferSig1(bytes sig) public returns (address[])  {
        // move ARCs and set public_link keys and weights/cuts based on signature information
        // returns the last address in the sig

        // sig structure:
        // 1 byte version 0 or 1
        // 20 bytes are the address of the contractor or the influencer who created sig.
        //  this is the "anchor" of the link
        //  It must have a public key aleady stored for it in public_link_key
        // Begining of a loop on steps in the link:
        // * 65 bytes are step-signature using the secret from previous step
        // * message of the step that is going to be hashed and used to compute the above step-signature.
        //   message length depend on version 41 (version 0) or 86 (version 1):
        //   * 1 byte cut (percentage) each influencer takes from the bounty. the cut is stored in influencer2cut or weight for voting
        //   * 20 bytes address of influencer (version 0) or 65 bytes of signature of cut using the influencer address to sign
        //   * 20 bytes public key of the last secret
        // In the last step the message can be optional. If it is missing the message used is the address of the sender
        address old_address;
        assembly
        {
            old_address := mload(add(sig, 21))
        }
        address old_key = public_link_key[old_address];

        address[] memory influencers;
        address[] memory keys;
        uint8[] memory weights;
        (influencers, keys, weights) = recoverSig(sig, old_key);

        // check if we exactly reached the end of the signature. this can only happen if the signature
        // was generated with free_join_take and in this case the last part of the signature must have been
        // generated by the caller of this method
        require(influencers[influencers.length-1] == msg.sender || owner == msg.sender,'only the contractor or the last in the link can call transferSig');

        uint i;
        address new_address;
        // move ARCs based on signature information
        for (i = 0; i < influencers.length; i++) {
            new_address = influencers[i];
            if (received_from[new_address] == 0) {
                transferFrom(old_address, new_address, 1);
            } else {
                require(received_from[new_address] == old_address,'only tree ARCs allowed');
            }
            old_address = new_address;
        }

        for (i = 0; i < keys.length; i++) {
            new_address = influencers[i];

            address key = keys[i];
            // TODO Updating the public key of influencers may not be a good idea because it will require the influencers to use
            // a deterministic private/public key in the link and this might require user interaction (MetaMask signature)
            // TODO a possible solution is change public_link_key to address=>address[]
            // update (only once) the public address used by each influencer
            // we will need this in case one of the influencers will want to start his own off-chain link
            if (public_link_key[new_address] == 0) {
                public_link_key[new_address] = key;
            } else {
                require(public_link_key[new_address] == key,'public key can not be modified');
            }
        }

        for (i = 0; i < weights.length; i++) {
            new_address = influencers[i];
            uint256 weight = uint256(weights[i]);

            // update (only once) the cut used by each influencer
            // we will need this in case one of the influencers will want to start his own off-chain link
            if (influencer2cut[new_address] == 0) {
                influencer2cut[new_address] = weight;
            } else {
                require(influencer2cut[new_address] == weight,'bounty cut can not be modified');
            }
        }

        return influencers;
    }

    function transferSig(bytes sig) public returns (address[]) {
        // must use a sig which includes a cut (ie by calling free_join_take in sign.js
        require((sig.length-21) % (65+1+65+20) == 0, 'signature is not version 1 and/or does not include cut of last vote');
        // validate sig AND populate received_from and influencer2cut
        address[] memory voters = transferSig1(sig);

        for (uint i = 0; i < voters.length; i++) {
            address influencer = voters[i];

            // extract the vote (yes/no) and the weight of the vote from cut
            uint256 cut = influencer2cut[influencer];
            bool new_votter = !voted[influencer];
            if(new_votter) {
                allVoters.push(influencer);
            }
            voted[influencer] = true;
            if (new_votter) {
                total_vote++;
            }
            bool yes;
            uint256 weight;
            if (cut <= 101) {
                yes = true;
                if (new_votter) {
                    voted_yes++;
                }
                weight = cut-1;
            } else if (154 < cut && cut < 255) {
                yes = false;
                if (new_votter) {
                    voted_no++;
                }
                weight = 255-cut;
            } else { // if cut == 255 then abstain
                weight = 0;
            }
            if (new_votter) {
                total_weight += weight;
            }
            weight -= voted_weight[influencer];

            if (weight > 0) {
                uint tokens = weight.mul(cost);
                // make sure weight is not more than number of coins influencer has
                uint _units = params1(erc20_token_sell_contract, "balanceOf(address)",uint(influencer));
                if (_units < tokens) {
                    tokens = _units;
                }
                // make sure weight is not more than what coins allows this contract to take
                uint _allowance = params2(erc20_token_sell_contract, "allowance(address,address)",uint(influencer),uint(this));
                if (_allowance < tokens) {
                    tokens = _allowance;
                }
                // vote
                if (tokens > 0) {
                    weight = tokens.div(cost);
                    if (yes) {
                        weighted_yes += weight;
                        weightedYes[influencer] = true;
                    } else {
                        weighted_no += weight;
                        weightedYes[influencer] = false;
                    }
                    // transfer coins from influncer to owner in the amount of the weight used for voting
                    require(address(erc20_token_sell_contract).call(bytes4(keccak256("transferFrom(address,address,uint256)")),influencer,owner,tokens));
                    voted_weight[influencer] += weight;
                }
            }
        }
        return voters;
    }


    function getVoteAndChoicePerAddress(address voter) public view returns (bool, uint) {
        return (weightedYes[voter], voted_weight[voter]);
    }

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transferQuota(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[msg.sender]);

        // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value * quota);
        totalSupply_ = totalSupply_ + _value * (quota - 1);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amount of tokens to be transferred
     */
    function transferFromQuota(address _from, address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value * quota);
        totalSupply_ = totalSupply_ + _value * (quota - 1);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amount of tokens to be transferred
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(received_from[_to] == 0);
        require(_from != address(0));
        allowed[_from][msg.sender] = 1;
        if (transferFromQuota(_from, _to, _value)) {
            received_from[_to] = _from;
            return true;
        } else {
            return false;
        }
    }

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(received_from[_to] == 0);
        if (transferQuota(_to, _value)) {
            received_from[_to] = msg.sender;
            return true;
        } else {
            return false;
        }
    }


    function getDescription() public view returns(string) {
        return description;
    }
}