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
// once we write the code "uploadToPinata" we will get the image URIs through running command: hh deploy; once we get the URIs in our command Line, we will copy the URI array
//and paste it in our code as array of tokenURI in "deploy-Random-ipfs-nft.js" then we will change the value of "uploadToPinata" in ".env" to false
;/RandomIpfsNft/ // people can choose to host metadata on IPFs but you need to pin the data at least 1 other user needs to pin the data, you can use fil Coin to do it but if you
//dont then chances are that your data wont get pinned
;/Dynamic SVG NFT/ // Scalable Vector Graphics
// we can host our metadata on chain
// its very expensive
// we need to convert our images to save the file size so that we make it feasable to be cheaper on chain
;/Base64 Encoding / // The way URI is gonna work in SVG NFT is that we are going to pass the SVG code and the contract should handle the URI for us
//we can create a function and convert the SVGs into IPFS URIs right in the contract; we are going to use "Base64 encoding" for this
// You can actually encode any SVG to a "base64 image URL"
// Base64 is a group of binary-to-text encoding schemes that represent binary data (more specifically, a sequence of 8-bit bytes) in sequences of 24 bits that can be represented
//by four 6-bit Base64 digits.
//Base64 is particularly prevalent on the World Wide Web[1] where one of its uses is the ability to embed image files or other binary assets inside textual assets such as HTML and CSS files
// convert "svg" into base64 by using site : https://base64.guru/converter/encode/image/svg
// copy the image URL> select Datatype: Remote URL > Encode
// you should be able to get the base64 code of your image URL
//data:image/svg+xml;base64,<base64>            opens your image if you paste this in your browser
