pragma solidity ^0.5.12;

import "./base/TokenSale.sol";
import "./Jaggery.sol";
import "./libraries/Math.sol";

contract JaggerySale is TokenSale {

    using Math for uint256;

    constructor(uint256 price, address tokenAddress) public {
        tokenPrice = price;
        tokenManager = msg.sender;
        tokenContract = Jaggery(tokenAddress);
    }

    function tokensLeft() public view returns (uint256) {
        return tokenContract.balanceOf(address(this));
    }

    function endSale() public {
        require(msg.sender == tokenManager);
        tokenContract.transfer(tokenManager, tokenContract.balanceOf(address(this)));
        selfdestruct(tokenManager);
    }

    function buy(uint256 amount) public payable {
        require(msg.value == amount.mul(tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= amount);
        require(tokenContract.transfer(msg.sender, amount));
        emit Sell(msg.sender, amount);
    }

}