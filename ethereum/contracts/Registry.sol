pragma solidity^0.5.12;

contract Registry {

    struct Details {
        address owner;
        address addr;
        uint8 version;
    }

    mapping(string => Details) private registry;

    function register(string memory name, address addr, uint8 version) public {
        require(registry[name].owner == address(0) || registry[name].owner == msg.sender);
        registry[name].owner = msg.sender;
        registry[name].addr = addr;
        registry[name].version = version;
    }

    function getDetails(string memory name) public view returns (address, address, uint8) {
        return (registry[name].owner, registry[name].addr, registry[name].version);
    }

    function changeOwner(string memory name, address newOwner) public {
        require(registry[name].owner == msg.sender);
        registry[name].owner = newOwner;
    }

}