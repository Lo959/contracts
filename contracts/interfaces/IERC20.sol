pragma solidity ^0.4.24;

/// Interface of ERC20 contract we need in order to invoke balanceOf method from another contracts
contract IERC20 {
    function balanceOf(address whom) view public returns (uint);
    function transfer(address _to, uint256 _value) public returns (bool);
    function getDecimals() view public returns (uint);
    function getTokenSymbol() view public returns (string);
}
