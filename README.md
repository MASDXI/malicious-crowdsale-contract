# Malicious code exploit contract

Explain [Why should we aware malicious code](https://pnd256.medium.com/why-we-should-be-aware-of-the-hiding-malicious-code-contract-7cb07a625701)  
Tutorial using Hardhat(Buidler) to complie, deploy and automated unit tests Solidity smart contract.  
you can use this project for learning
To run these tutorials, you must have the following installed:

- [nodejs](https://nodejs.org/en/)

- [nvm](https://github.com/nvm-sh/nvm)

```bash
$ yarn install
```

to compile your smart contract to get an ABI and artifact of a smart contract.

```bash
$ yarn compile
```

for a unit testing smart contract using the command line.

```
$ yarn test
```

expecting `sample-test.js` result.

```bash
  npx hardhat test


  Crowdsale ICO
    ✔ Should rug complate (628ms)


  1 passing (629ms)

✨  Done in 1.38s.

```

after testing if you want to deploy the contract using the command line.

```bash

$ yarn rpc
# Open another Terminal
$ yarn exploit

# result in npx hardhat node Terminal
web3_clientVersion
eth_chainId
eth_accounts
eth_chainId
eth_estimateGas
eth_gasPrice
eth_sendTransaction
  Contract deployment: <UnrecognizedContract>
  Contract address:    0x5fb...aa3
  Transaction:         0x4d8...945
  From:                0xf39...266
  Value:               0 ETH
  Gas used:            323170 of 323170
  Block #1:            0xee6...85d

eth_chainId
eth_getTransactionByHash
eth_blockNumber
eth_chainId (2)
eth_getTransactionReceipt

# result in npx hardhat run Terminal
UUSDT deployed to: 0xfaE849108F2A63Abe3BaB17E21Be077d07e7a9A2
ALICE USDT balance BigNumber { value: "100000000000000000000000000" }
BOB USDT balance BigNumber { value: "100000000000000000000000000" }
Token deployed to: 0x12456Fa31e57F91B70629c1196337074c966492a
😈 ICO deployed to: 0xD5bFeBDce5c91413E41cc7B24C8402c59A344f7c
😈 ICO USDT balance BigNumber { value: "100000000000000000000" }
😈 ICO contract bytecode true
CHARLIE USDT balance BigNumber { value: "33333333333333333333" }
DAN USDT balance BigNumber { value: "33333333333333333333" }
EDWARD USDT balance BigNumber { value: "33333333333333333333" }
DAN USDT balance BigNumber { value: "100000000000000000000" }
😈 ICO contract bytecode false

```

your can edit deploy network endpoint at `hardhat.config.js`.

```javascript
module.exports = {
  networks: {
        {
        localhost: {
          url: "http://127.0.0.1:8545"
        },
        hardhat: {
          // See its defaults
        }
  }
};

```
