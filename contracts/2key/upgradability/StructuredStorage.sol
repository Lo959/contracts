pragma solidity ^0.4.0;

import "./Upgradeable.sol";

contract StructuredStorage is Upgradeable {

    bool initialized;

    address proxyLogicContract;
    address deployer;

    mapping(bytes32 => uint) uIntStorage;
    mapping(bytes32 => string) stringStorage;
    mapping(bytes32 => address) addressStorage;
    mapping(bytes32 => bytes) bytesStorage;
    mapping(bytes32 => bool) boolStorage;
    mapping(bytes32 => int) intStorage;


    modifier onlyDeployer {
        require(msg.sender == deployer);
        _;
    }

    modifier onlyProxyLogicContract {
        require(msg.sender == proxyLogicContract);
        _;
    }

    // *** Setter for Contract which holds all the logic ***
    function setProxyLogicContractAndDeployer(address _proxyLogicContract) external {
        require(initialized == false);

        deployer = msg.sender;
        proxyLogicContract = _proxyLogicContract;

        initialized = true;
    }

    function setProxyLogicContract(address _proxyLogicContract) external onlyDeployer {
        proxyLogicContract = _proxyLogicContract;
    }

    // *** Getter Methods ***
    function getUint(bytes32 _key) external view returns(uint) {
        return uIntStorage[_key];
    }

    function getString(bytes32 _key) external view returns(string) {
        return stringStorage[_key];
    }

    function getAddress(bytes32 _key) external view returns(address) {
        return addressStorage[_key];
    }

    function getBytes(bytes32 _key) external view returns(bytes) {
        return bytesStorage[_key];
    }

    function getBool(bytes32 _key) external view returns(bool) {
        return boolStorage[_key];
    }

    function getInt(bytes32 _key) external view returns(int) {
        return intStorage[_key];
    }

    // *** Setter Methods ***
    function setUint(bytes32 _key, uint _value) external {
        uIntStorage[_key] = _value;
    }

    function setString(bytes32 _key, string _value) external {
        stringStorage[_key] = _value;
    }

    function setAddress(bytes32 _key, address _value) external {
        addressStorage[_key] = _value;
    }

    function setBytes(bytes32 _key, bytes _value) external {
        bytesStorage[_key] = _value;
    }

    function setBool(bytes32 _key, bool _value) external {
        boolStorage[_key] = _value;
    }

    function setInt(bytes32 _key, int _value) external {
        intStorage[_key] = _value;
    }

    // *** Delete Methods ***
    function deleteUint(bytes32 _key) external {
        delete uIntStorage[_key];
    }

    function deleteString(bytes32 _key) external {
        delete stringStorage[_key];
    }

    function deleteAddress(bytes32 _key) external {
        delete addressStorage[_key];
    }

    function deleteBytes(bytes32 _key) external {
        delete bytesStorage[_key];
    }

    function deleteBool(bytes32 _key) external {
        delete boolStorage[_key];
    }

    function deleteInt(bytes32 _key) external {
        delete intStorage[_key];
    }
}
