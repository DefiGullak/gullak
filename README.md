
<p align="center">
<img src="./imgs/logo.png" width="100" height="100">
</p>


# Gullak


HODLing has been the best strategy in crypto. **Hodl** is here to help you do that with some extra incentive!

## What is Gullak

Gullak is  designed to let anyone create "hodling competition" on any ERC20 tokens. Users can always choose to quit early with a penalty charged. If a participant successfully hodls the token until expiry, they can withdraw the full amount they deposited without any fee, and with some extra tokens collected from quitters, or other "bonus token" that can be donated to the pool.
T
#### Other Innovations
You can always wrap your hToken into some tradable ERC20 tokens by using another wrapping contract, and add more interesting logic to build fun projects, e.g., make it transferable only until a certain date.


## What is in this repository

This is the contract repo for **Hodl**, which enables anyone to create Gullak pools. There are 2 contracts in the core folder:

- `GullakERC20`: Implementation contract to "Hodl" an ERC20.
- `GullakFactory`: Factory contract to clone `GullakERC20` with EIP1167.

## What does GullakERC20 do?

When a user deposit ERC20 into a HODL pool, the tokens will be locked up in the contract until the end of a pre-defined **expiry**. If a user wants to remove their funds before expiry, they will be penalized by `penalty` proportional to their deposit, and the slashed amount will go back in to the **reward pool** that will be shared by everyone else holding a "share".

### Shares and hTokens

Every time you join a pool, you get a `hodl` Token + some shares. The hodl token is a **non-transferable** ERC20 - this is to prevent anyone from creating a secondary market to trade this token, which would eventually make it not a hodl strategy anymore.

The shares you get from the deposit will decrease (linearly / exponentially according to a decrease parameter `n`) as time goes by - this is to prevent a last minute depositor from enjoying the full reward. This also means that the earlier you deposit, the more shares of the pool you can get.

### Fees

A `fee` is charged from penalty when a pool member quits early. The creator of the HodlERC20 contract can specify a `feeRecipient` address that can later collect those fees. For example, it can be set to a governance contract address that distributes the reward to all token stakers.

All quitter's penalty goes to the common pool, from which anyone with a pool share can proportionally redeem at any time.
When a user quits, they are also forced to redeem some of the pool shares (proportional to the amount they're withdrawing). This is necessary to prevent people from leaving the pool early but still earning rewards.

## Run this repo locally

### Install

```bash
npm i 
```

### Test

```bash
# unit test
npx hardhat test

# coverage test
npx hardhat coverage 
```

### Lint

```bash
npx hardhat format
```

### Run slither analysis

Slither is a static code analysis tool that helps to detect bad smart contract patterns.

#### Install [Slither](https://github.com/crytic/slither)
```
pip3 install slither-analyzer
```
Or find more details [here](https://github.com/crytic/slither#how-to-install) in their documentation.

#### Run Analysis

```
slither .
```

### Deployment

Running this script will deploy both `GullakERC20` and `GullakFactory`, and try to get them verified on etherscan.

```shell
npx hardhat run --network {network} scripts/deploy.ts
```

### Smart contracts

Project deploy matic network.
https://mumbai.polygonscan.com/address/0x13ffd378de221e4b44e56c9b0b8350f52fed8a1f

https://mumbai.polygonscan.com/address/0xd199d2d55a52575deaa6dcb747a8a22ee06a113e

#Kovan
https://kovan.etherscan.io/address/0x1276853a696c3f367c26fc2f0fd562362e702477


https://kovan.etherscan.io/address/0x8437f9ef63261733302229a6f5e2f1a35b1b2493