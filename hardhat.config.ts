import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"

require("dotenv").config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const GOERLI_URL = process.env.GOERLI_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
    solidity: "0.8.0",
    networks: {
        goerli: {
            chainId: 5,
            url: GOERLI_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    }
};

export default config;
