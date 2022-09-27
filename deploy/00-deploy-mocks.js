const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const { chainId } = network.config.chainId // will use network.name
    const BASE_FEE = ethers.utils.parseEther("1") //"250000000000000000" // ethers.utils.parseEther("0.25") // base fee of 0.25 LINK on rinkeby for requesting a random number every time
    const GAS_PRICE_LINK = 1e9 //1000000000 //calculated value based on the gas price of the chain
    // link per gas, is this the gas lane? // 0.000000001 LINK per gas
    const args = [BASE_FEE, GAS_PRICE_LINK]

    // ChainLink NOdes pay the gas fees to give us the randomness and do external execution
    if (developmentChains.includes(network.name)) {
        log("Local network Detected, Deploying Mocks")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args
        })
        log("-------------------Mocks Deployed!--------------")
        log("------------------------------------------------")
    }
}
async function storeTokenUriMetadata(metadata) {}
module.exports.tags = ["all", "mocks"]
