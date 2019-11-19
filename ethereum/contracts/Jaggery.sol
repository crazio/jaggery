pragma solidity ^0.5.12;

import "./interfaces/ERC20.sol";
import "./libraries/Math.sol";

contract Jaggery is ERC20 {

    using Math for uint256;

    string constant private TOKEN_NAME = "Jaggery";
    string constant private TOKEN_SYMBOL = "JGR";
    uint8 constant private TOKEN_DECIMALS = 2;

    uint256 private tokenSupply;

    mapping(address => uint256) private balance;
    mapping(address => mapping(address => uint256)) private allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) public {
        balance[msg.sender] = initialSupply;
        tokenSupply = initialSupply;
    }

    function name() public view returns (string memory) {
        return TOKEN_NAME;
    }

    function symbol() public view returns (string memory) {
        return TOKEN_SYMBOL;
    }

    function decimals() public view returns (uint8) {
        return TOKEN_DECIMALS;
    }

    function totalSupply() public view returns (uint256) {
        return tokenSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balance[owner];
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowed[owner][spender];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balance[msg.sender] >= value);
        balance[msg.sender] = balance[msg.sender].sub(value);
        balance[to] = balance[to].add(value);
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(value <= balance[from]);
        require(value <= allowed[from][msg.sender]);
        balance[to] = balance[to].add(value);
        balance[from] = balance[from].sub(value);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

}