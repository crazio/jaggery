const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const BigNumber = require("bignumber.js");

const jaggeryCompiled = require("../ethereum/build/Jaggery.json");
const jagSaleCompiled = require("../ethereum/build/JaggerySale.json");

const TOTAL_SUPPLY = new BigNumber(2**200); // Maximum possible token count
const PRICE = 5000000000000000; //Token Price in Wei

const web3 = new Web3(ganache.provider());

let accounts;
let jaggery;
let jaggerySale;
let managerAddr;
let buyerAddr;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    managerAddr = accounts[0];
    buyerAddr = accounts[1];

    jaggery = await new web3.eth.Contract(jaggeryCompiled.abi).deploy({
        data: jaggeryCompiled.evm.bytecode.object,
        arguments: [TOTAL_SUPPLY.toFixed()]
    }).send({ 
        from: managerAddr, gas: "1000000"
    });

    console.log(jaggery);

    jaggerySale = await new web3.eth.Contract(jagSaleCompiled.abi).deploy({
        data: jagSaleCompiled.evm.bytecode.object,
        arguments: [PRICE, jaggery.options.address]
    }).send({
        from: managerAddr, gas: "1000000"
    });

});

describe("JaggerySale", () => {

    it("Jaggery and JaggerySale deployed", () => {
        assert.ok(jaggery.options.address);
        assert.ok(jaggerySale.options.address);
    });

    it("Check token supply", async () => {
        const totalSupply = new BigNumber(await jaggery.methods.totalSupply().call());
        assert(totalSupply.isEqualTo(TOTAL_SUPPLY));
    });

    it("Check all tokens are owned by manager", async () => {
        const managerBalance = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        assert(managerBalance.isEqualTo(TOTAL_SUPPLY));
    });

    it("Check transfer to sale contract", async () => {
        const managerBalance = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        await jaggery.methods.transfer(jaggerySale.options.address, managerBalance.toFixed()).send({
            from: managerAddr,
            gas: "100000"
        });
        const zeroBalance = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        const saleBalance = new BigNumber(await jaggery.methods.balanceOf(jaggerySale.options.address).call());
        assert(zeroBalance.isEqualTo(0));
        assert(saleBalance.isEqualTo(TOTAL_SUPPLY));
    });

    it("Check token sell", async () => {

        const managerBalance = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        await jaggery.methods.transfer(jaggerySale.options.address, managerBalance.toFixed()).send({
            from: managerAddr,
            gas: "100000"
        });

        const TOKENS_NUMBER = 50;
        const weiNumber = new BigNumber(TOKENS_NUMBER * PRICE);
        
        //Get values before transfer
        const buyerBalanceBfr = new BigNumber(await jaggery.methods.balanceOf(buyerAddr).call());
        const saleBalanceBfr = new BigNumber(await jaggery.methods.balanceOf(jaggerySale.options.address).call());

        await jaggerySale.methods.buy(TOKENS_NUMBER).send({
            from: buyerAddr,
            value: weiNumber.toFixed()
        });

        //Get values after transfer
        const buyerBalanceAft = new BigNumber(await jaggery.methods.balanceOf(buyerAddr).call());
        const saleBalanceAft = new BigNumber(await jaggery.methods.balanceOf(jaggerySale.options.address).call());

        //Compare with difference
        assert(buyerBalanceAft.isEqualTo(buyerBalanceBfr.plus(TOKENS_NUMBER)));
        assert(saleBalanceAft.isEqualTo(saleBalanceBfr.minus(TOKENS_NUMBER)));

    });

    it("Check Wei Balance", async () => {

        const managerBalance = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        await jaggery.methods.transfer(jaggerySale.options.address, managerBalance.toFixed()).send({
            from: managerAddr,
            gas: "100000"
        });

        const TOKENS_NUMBER = 50;
        const weiNumber = new BigNumber(TOKENS_NUMBER * PRICE);

        const saleWeiBfr = await web3.eth.getBalance(jaggerySale.options.address);

        await jaggerySale.methods.buy(TOKENS_NUMBER).send({
            from: buyerAddr,
            value: weiNumber.toFixed()
        });

        const saleWeiAft = await web3.eth.getBalance(jaggerySale.options.address);

        assert(saleWeiAft ==  weiNumber.plus(saleWeiBfr).toFixed());

    });

    it("Check End Sale", async () => {
        
        const managerBalanceInit = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());
        await jaggery.methods.transfer(jaggerySale.options.address, managerBalanceInit.toFixed()).send({
            from: managerAddr,
            gas: "100000"
        });

        await jaggerySale.methods.endSale().send({
            from: managerAddr,
            gas: "100000"
        });

        const managerBalanceEnd = new BigNumber(await jaggery.methods.balanceOf(managerAddr).call());

        assert(managerBalanceInit.isEqualTo(managerBalanceEnd));

    });

});