const hre = require("hardhat");

async function main() {
    const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy("Hello, Web3!");

    // await hello.deployed();
    // console.log(`Contract deployed at: ${hello.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
