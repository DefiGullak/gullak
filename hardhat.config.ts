import '@nomiclabs/hardhat-waffle';
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import "hardhat-gas-reporter"
import "hardhat-prettier";

import * as fs from 'fs';
import * as dotenv from 'dotenv'

import './tasks/deployERC20'

dotenv.config()
const { mnemonic, privateKey, infuraProjectId, etherscanApiKey } = require('./secrets.json');


const infuraKey = infuraProjectId
const etherscanKey = etherscanApiKey

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  networks: {
    hardhat: {},
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraKey}`,
      accounts: { mnemonic: mnemonic },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraKey}`,
      chainId: 42,
      accounts: [privateKey]
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: { mnemonic: mnemonic },
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: { mnemonic: mnemonic },
    },
    matic: {
      chainId: 137,
      url: 'https://rpc-mainnet.matic.network',
      // accounts: { mnemonic: mnemonic },
      accounts: [privateKey]
    },
    mumbai: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com",
      // accounts: { mnemonic: mnemonic }
      accounts: [privateKey]
      
    }
  },
  solidity: '0.7.3',
  settings: {
    optimizer: {
      enabled: true,
      runs: 5,
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  contractSizer: {
    alphaSort: true,
  },
  etherscan: {
    apiKey: etherscanKey
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    coinmarketcap: process.env.COINMARKETCAP,
    enabled: process.env.REPORT_GAS === 'true'
  }
};
