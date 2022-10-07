import {DeployFunction} from "hardhat-deploy/dist/types";
import {ethers, network} from "hardhat";
import verify from "../utils/verify";

const deployDex: DeployFunction = async function ({deployments}) {
    const {deploy} = deployments
    const chainId = network.config.chainId!
    const deployer = (await ethers.getSigners())[0]

    const waitBlockConfirmations = chainId == 31337 ? 1 : 6

    const token = await deploy("MyToken", {
        from: deployer.address,
        log: true,
        waitConfirmations: waitBlockConfirmations
    })

    const dex = await deploy("Dex", {
        from: deployer.address,
        args: [token.address],
        log: true,
        waitConfirmations: waitBlockConfirmations
    })

    // Verify the deployment
    if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await verify(token.address, [])
        await verify(dex.address, [token.address])
    }
}

export default deployDex