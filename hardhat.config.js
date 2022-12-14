/** @type import('hardhat/config').HardhatUserConfig */
//module.exports = {
//require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ""

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

//const REPORT_GAS = process.env.REPORT_GAS || false
//const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || abc
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337
            // forking: {
            //     url: MAINNET_RPC_URL
            // }
        },
        // localhost: {
        //     chainId: 31337
        // },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6
        }
    },
    solidity: {
        compilers: [
            { version: "0.8.7" },
            { version: "0.4.19" },
            { version: "0.6.0" },
            { version: "0.6.12" }
        ]
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: ETHERSCAN_API_KEY,

        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                    apiURL: "https://api-goerli.etherscan.io/api",
                    browserURL: "https://goerli.etherscan.io/"
                }
            }
        ]
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0 // here this will by default take the first account as deployer
            //Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        user1: {
            default: 1
        }
    },

    mocha: {
        timeout: 100000000 // 500 seconds max for running tests
    }
}
