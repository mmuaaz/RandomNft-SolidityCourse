;/Hardhat setup/
//RUN COMM: yarn add --dev hardhat
//copy and paste hardhat.config, .gitignore, pretteirrc, .prettierignore files from previouse project
// copy package.json from previous project and RUN COMM: yarn
// RUN COMM: yarn add --dev @openzeppelin/contracts  in order to import and use:
;/ NFT SC using ERC-721 token standard/ //https://docs.openzeppelin.com/contracts/4.x/erc721
;/Random NFT minting using IPFS and ChainLink VRF/
//RUN COMM: yarn add --dev @chainlink/contracts
;/RandomIpfsNft.sol/
//Constructor:
// VRFConsumerBaseV2 needs and address; so we pass "address vrfCoordinatorV2" in our constructor and VRF constructor
// we want to save that address to a global variable so that we can call "requestRandomWords" on it
// once the RandomIpfsNft.sol is done, we are gonna work on deoloy scripts, copy mocks script from the last project
;/ same subscription ID can be used for NFT SC/
;/uploading images for tokenURI/ //doing this programmatically by using Pinata is 1 option
//or we can use Ipfs to upload our images there and then use the link to save in the string array
//save images in your project directory using a folder "images" > "randomNft" <drop all your NFT images in this folder>
;/Pinata/ //https://www.pinata.cloud/
// is used to Pin data for us where we upload the data to IPFS but as it only uses our node then it becomes very risky so we use some service to Pin our Data,
//RUN COMM: yarn add --dev @pinata/sdk
;/NFT Storage/ //https://nft.storage/
;/NFT.Storage/
//we are not working with NFT.Storage in this project but Patrick wrote the code to upload the images on NFT Storage for us so I have saved the script in "Utils" folder
// Pinata have all these endpoints that we can call to pin data, we are gonna be doing "pinFileToIPFS" because we are going to upload our files and also "pinJSONToIPFS"
//since JSON is going to be the metadata while file is gonna be the actual image
;/Path Package/
// to help us work with path we are gonna instal this path package
// RUN COMM: yarn add --dev path
// create pinata API key from pinata website; copy the api key and secret key and paste with seperate entries in ".env" file
/// uploading images to Pinata programmatically by using a script "Upload to Pinata"
;/Metadata/
//we will populate the "metadata template" in the "deploy-random-ipfs-nft" file with what we get from storing to IPFS
