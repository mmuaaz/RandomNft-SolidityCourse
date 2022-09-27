const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const imagesLocation = "./images/randomNft/"

const metadataTemplate = {
    //we will populate the "metadata template" in the "deploy-random-ipfs-nft" file with what we get from storing to IPFS
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "Cuteness",
            value: 100
        }
    ]
}

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const { chainId } = network.config.chainId

    // we need to get the IPFS hashes of our images
    //we can do this by following ways;
    //1. using our own IPFS node
    // //2.  or uploading metadata and tokenURIs on Pinata or NFT.Storage
    let tokenUris
    if (process.env.UPLOAD_TO_PINATA == "true") {
        tokenUris = await handleTokenUris()
    }

    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const tx = await vrfCoordinatorV2Mock.createSubscription()
        const txReciept = await tx.wait(1)
        subscriptionId = txReciept.events[0].args.subId
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2 /*["vrfCoordinatorV2"]*/
        subscriptionId = networkConfig[chainId].subscriptionId /*["subscriptionId"]*/
    }
    log("----------------------------------------------------")
    //await storeImages(imageLocation)
    // const gasLane = networkConfig[chainId]["gasLane"]
    // const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    // const args = [
    //     vrfCoordinatorV2Address,
    //     subscriptionId,
    //     /*networkConfig[chainId].*/ gasLane,
    //     /*networkConfig[chainId].*/ callbackGasLimit,
    //     // tokenUris            // networkConfig[chainId].dogTokenUris,
    //     /*networkConfig[chainId].*/ mintFee
    // ]
    log("--------------------------------------------------------------------------------")
    //     const RandomIpfsNft = await deploy("RandomIpfsNft", {
    //         from: deployer,
    //         args: args,
    //         log: true,
    //         waitConfirmations: network.config.blockConfirmations || 1
    //     })
    //     if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //         log("-------Verifying.... Please Wait !-------------")
    //         await verify(raffle.address, args)
    //     }
    //     log("--------------------------------------------------------------------------------")
    // }

    async function handleTokenUris() {
        // We need to store
        //1. IMAGES to IPFS
        // for this we need "responses", "files"
        // In "responses" pinFileToIPFS is going to return the hash of the file and we need it to add it to our metadata
        tokenUris = []
        const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
        // this "response" is gonna be a list of responses from Pinata containing the hash from each of these uploaded files
        for (imageUploadResponseIndex in imageUploadResponses) {
            let tokenUriMetadata = { ...metadataTemplate } // "..." is a syntatic sugar used for "unpacked"
            //actually we are saying by using "..." that means variable"tokenUriMetadata" is going to be equal to whatever returns from "metadataTemplate"
            tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "") // setting the name of the NFT to be whatever is the name of the file IG?
            tokenUriMetadata.description = `An adorable ${tokenUriMetadata.name} pup!` // Setting description of the "x" NFT which will be populated upon mint
            tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}` //setting image to have extension of the IPFS with IPFS hash
            //which we get from the response("IpfsHash"), this is returned by "pinFileToIPFS"
            console.log(`Uploading ${tokenUriMetadata.name}...`)
        } // 2. METADATA to IPFS
        //we need to create a function to "uploadToPinata" script
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs uploaded! They are:")
    console.log(tokenUris)
    return tokenUris
}

module.exports.tags = ["all", "randomIpfs", "main"]
