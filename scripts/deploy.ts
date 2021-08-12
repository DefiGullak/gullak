import { Contract } from "@ethersproject/contracts";
import { run, ethers } from "hardhat";
const chalk = require("chalk");
const { utils } = require("ethers");
const R = require("ramda");
const fs = require("fs");

const deploy = async (contractName: string, _args: string[]) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName);
  const deployed = await contractArtifacts.deploy(...contractArgs);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address),
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed: Contract, contractArgs: any) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};
// checks if it is a Solidity file
const isSolidity = (fileName: string | string[]) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0;

  ``
async function main() {
  await run("compile");

  // We get the contract to deploy
  const gullakLogic = await deploy("GullakERC20",[])
  // const Gullak = await ethers.getContractFactory("GullakERC20");
  // const gullakLogic = await Gullak.deploy();

  // await gullakLogic.deployed();

  console.log("🥙 Gullak logic contract deployed at:", gullakLogic.address);
  

  // const GullakFactory = await ethers.getContractFactory("GullakFactory");
  // const factory = await GullakFactory.deploy(gullakLogic.address);

  // await factory.deployed();
  const factory = await deploy("GullakFactory",[gullakLogic.address])
  console.log("🍩 Gullak Factory contract deployed at:", factory.address);

  // verify contracts at the end, so we make sure etherscan is aware of their existence

  await run("verify:verify", {
    address: gullakLogic.address, 
    network: ethers.provider.network
  })

  await run("verify:verify", {
    address: factory.address, 
    network: ethers.provider.network,
    constructorArguments: [gullakLogic.address]
  })  
}


const readArgsFile = (contractName: any) => {
  let args: never[] = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
