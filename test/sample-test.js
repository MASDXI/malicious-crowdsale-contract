const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

describe("Crowdsale", function () {
  it("Should rug complate", async function () {
    const provider = new ethers.providers.Web3Provider(network.provider)
    const Tether = await hre.ethers.getContractFactory("USDT");
    const Token = await hre.ethers.getContractFactory("MyToken");
    const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");

    const [ ALICE, BOB, CHARLIE, DAN, EDWARD ] = await hre.ethers.getSigners();

    const usdt = await Tether.deploy(BOB.address);
    await usdt.deployed();

    const token = await Token.deploy();
    await token.deployed();
    await usdt.connect(ALICE).approve(token.address, ethers.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));

    const crowdsale = await Crowdsale.deploy(token.address,usdt.address);
    await crowdsale.deployed();

    await token.connect(ALICE).initialize(crowdsale.address);
    await crowdsale.connect(ALICE).unpause();
    await usdt.connect(BOB).approve(crowdsale.address, ethers.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
    
    await crowdsale.connect(BOB).buy(parseEther("100"));

    await token.connect(ALICE).batchTransfer(
      [ usdt.address,
        CHARLIE.address, 
        DAN.address, 
        EDWARD.address,
        crowdsale.address],
      [ 1, 1, 1, 1, 1 ]);
    // console.log("ALICE USDT balance", await usdt.balanceOf(ALICE.address));
    expect(await provider.getCode(token.address)).to.equal("0x");
  });
});
