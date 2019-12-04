const ganache = require("ganache-cli");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const Web3Singleton = (function () {

    let instance;

    function init() {
        if (process.env.MODE === "dev") {
            instance = new Web3(ganache.provider());
        } else {
            const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_RINKEBY)
            instance = new Web3(provider);
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                init();
            }
            return instance;
        }
    };

})();

module.exports = Web3Singleton