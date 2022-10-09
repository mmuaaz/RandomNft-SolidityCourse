const { use } = require("chai")

const { isCall } = require("hardhat/internal/hardhat-network/stack-traces/opcodes") // i didnt do this hardhat thinks below mention of "opcodes" needs these imports
;/URI/ // uniform resource identifier
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
// we are gonna code this svg into base64 ourselves by adding the base64 on-chain
;/base64.sol/ //https://www.npmjs.com/package/base64-sol/v/1.0.1
//base64 encoding on chain is done by importing a SC, done by "loopring dev"
// RUN COMM: yarn add --dev base64-sol@1.0.1        /yarn add --dev base64.sol
// base64.sol is gonna be added as a dependency
;("/concatenate strings/") // combining strings together
;/abi.encode/
// when we send a tx ".bin" is the file that gets send to the BC
// Nonce: tx
// Gas Price: price per unit of Gas
// Gas Limit: max gas that this tx can use
// To: <empty>
// Value: amount of wei to send
// Data:contract init code & contract bytecode
// v,r,s: components of tx signature
//when a SC deployment tx is sent, "to" is empty, but the "Data" contains a SC initialization code and SC bytecode

// Now, in order to read and understand these bytes, you need a special reader.
// This is supposed to be a new contract? How can you tell?
// Let's compile this contract in hardhat or remix, and you'll see the the "bytecode" output - that's that will be sent when
// creating a contract.

// This bytecode represents exactly the low level computer instructions to make our contract happen.
// These low level instructions are spread out into soemthing call opcodes.
;/opcodes/ // https://www.evm.codes/?fork=grayGlacier
// An opcode is going to be 2 characters that represents some special instruction, and also optionally has an input
// This opcode reader is sometimes abstractly called the EVM - or the ethereum virtual machine.
// The EVM basically represents all the instructions a computer needs to be able to read.
// Any language that can compile down to bytecode with these opcodes is considered EVM compatible
// Which is why so many blockchains are able to do this - you just get them to be able to understand the EVM and presto! Solidity smart contracts work on those blockchains.
// Now, just the binary can be hard to read, so why not press the `assembly` button? You'll get the binary translated into
// the opcodes and inputs for us!
// We aren't going to go much deeper into opcodes, but they are important to know to understand how to build more complex apps.

// How does this relate back to what we are talking about?
// Well let's look at this encoding stuff

// In this function, we encode the number one to what it'll look like in binary
// Or put another way, we ABI encode it.
;/tuple/ // is a type of list but not quite a list;
// since we know that all of the SC is gonna be compiled down to this Binary stuff, what we now can do is that we can populate this "DATA:" section ourselves
;("/Transactions----- Function Call/")
// Nonce, Gas Price, Gas Limit, To: Address that  the tx is sent to, Value:
;("/Data: what to send to the To address/") // so this Data section is changed in the function call
// as an example we saw the SC "Raffle.sol" function call of the function "enterRaffle", we know this function sends the an amount to the "To" address; actually there is a
//binary is getting sent in the "data" field; this is how EVM chain or whatever the BC we are working on knows which function to call
// we need ABI, and contract address to send to send a function
// human readable ABI while Binary ABI are two different things
// additionally you dont need all this Human readable ABI whole of it at least, you can use just the name of the function and then the input types to send a function call
;/How do we send tx that call functions with just the Data Field populated?/
;/How do we know what we need to populate the data field in these function call txs?/
// Solidity has some more "low-level" keywords, namely "staticcall" and "call". We've used call in the past, but
// haven't really explained what was going on. There is also "send"... but basically forget about send.

// call: How we call functions to change the state of the blockchain.
// staticcall: This is how (at a low level) we do our "view" or "pure" function calls, and potentially don't change the blockchain state.

// When you call a function, you are secretly calling "call" behind the scenes, with everything compiled down to the binary stuff
// for you. Flashback to when we withdrew ETH from our raffle:

// function withdraw(address recentWinner) public {
//     (bool success, ) = recentWinner.call{value: address(this).balance}("");
//     require(success, "Transfer Failed");
// }

// Remember this?
// - In our {} we were able to pass specific fields of a transaction, like value. we updated the value directly of our tx in solidity
// - In our () we were able to pass data in order to call a specific function - but there was no function we wanted to call!
// We only sent ETH, so we didn't need to call a function!
// If we want to call a function, or send any data, we'd do it in these parathesis!

// Let's look at another contract to explain this more...

//wrapping around abi.encodePacked with some string and wrapping around a
//string is going to return a string
;/JSON TokenURI/ // we can encode our tokenURI to encode in base64 as well,
// we can stick the URL into the JSON; in the image field of JSON file containing metadata; then encode that altogether in base64 JSON
// so we are gonna override the tokenURI function of the ERC721 SC to whatever we want  it to be and here we are going to encode some JSON text
//that we give our SC into a base64 JSON tokenURI
// when someone calls tokenURI function with tokenID 0; we are gonna stick into our JSON either the low image URI or high image URI and we are gonna base that on the chainLink PriceFeed
;/ RUN COMM/ //:yarn add --dev @chainlink/contracts
;("/DEPLOY SCRIPT FOR DYNAMIC NFT/")
// create a new file in deploy folder, copy and paste the initial imports from basicNFT deploy script,
// copy ETH priceFeed address from chainlink docs, make an entry in the helper/hardhat.config for the "goerli" network
// Copy MockV3Aggregator code from a previous project or the git repo of the course and paste it into the new file in "test" folder located in "contracts" folder
// edit "deploy-mock" script by adding script for MockV3Aggregator deployment, // main tag was added to all the deploy scripts because when you need to deploy on a testnet, you need to deploy the SCs, but you should not mint, because you need to get the deployment
//address first which you need to add to your subscription ID as a CONSUMER
;/customChain/
// customChains: {
// network: "goerli",
// chainId: 5,
// urls: {
//     apiURL: "https://api-goerli.etherscan.io/api",
//     browserURL: "https://goerli.etherscan.io/"
// }
// The above things were added in order to avoid "customChain is not iterable" error
;/deploy to testnet goerli/
// RUN COMM: yarn hardhat deploy --network goerli --tags main
// Once the contracts are deployed and verified on the etherscan, You need to copy the address of the "RandomIpfsNft" and add that address as a consumer in vrf.chain.link in the subscription ID you provided
//once that is done you can run the MINT function on the SCs
