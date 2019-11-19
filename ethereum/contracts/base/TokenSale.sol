pragma solidity ^0.5.12;

import "../interfaces/ERC20.sol";

contract TokenSale {

    ERC20 internal tokenContract;
    uint256 internal tokenPrice;
    address payable internal tokenManager;

    event Sell(address buyer, uint256 amount);

    function buy(uint256 amount) public payable;

    function price() public view returns (uint256) {
        return tokenPrice;
    }

}