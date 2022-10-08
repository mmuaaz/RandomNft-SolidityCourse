// DynamicSvgNft/sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

//imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "base64-sol/base64.sol"; //This contract comes with an encoder

contract DynamicSvgNft is ERC721 {
    // we are not gonna call "setTokenURI" function that we called the last time, we can just use the raw ERC721
    //instead of an extension
    // mint the NFTs
    // store our SVG infromation somewhere
    // some logic to say "Show X image or Y image depending upon somethings

    uint256 private s_tokenCounter;
    string private i_lowImageURI;
    string private i_highImageURI;
    string private constant base64EncodedSvgPrefix = "data:image/svg+xml;base64,";
    AggregatorV3Interface internal immutable i_priceFeed;
    mapping(uint256 => int256) public s_tokenIdToHighValues;

    event CreatedNFT(uint256 indexed tokenId, int256 highValue);

    constructor(
        address priceFeedAddress,
        string memory lowSvg,
        string memory highSvg
    ) ERC721("Dynamic SVG NFT", "DSN") {
        s_tokenCounter = 0;
        i_lowImageURI = svgToImageURI(lowSvg);
        i_highImageURI = svgToImageURI(highSvg);
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
        // We will assign each NFT their own high Value
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    // We are gonna allow minters to choose the price Threshold they wish to see the dynamic NFT change
    function mintNft(int256 highValue) public {
        s_tokenIdToHighValues[s_tokenCounter] = highValue; // minters choosing the highValue(threshold) they wanna assign
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(msg.sender, s_tokenCounter);
        emit CreatedNFT(s_tokenCounter, highValue);
    }

    //ERC721 has a baseURI that we are gonna override and then we are gonna use it
    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    } // now we can use this baseURI to append

    // when someone calls tokenURI function with tokenID 0; we are gonna stick into our JSON either the low image URI or high image URI and we are gonna base that on the chainLink PriceFeed

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // we have to figure out how to make this tokenURI function return base64 version of JSON/
        //so we are gonna override the tokenURI function of the ERC721 SC to whatever we want it to be and here we are going to encode some JSON text
        //that we give our SC into a base64 JSON tokenURI
        require(_exists(tokenId), "URI Query for nonexistent token "); // _exists is coming from a function located in ERC721 SC

        // prefix for svg images:      data:image/svg+xml;base64,
        // prefix for base64 JSON:     data:application/json;base64,
        //First we do is concatenate a string
        (, int256 price, , , ) = i_priceFeed.latestRoundData();
        // Applying condition if price of an asset is below X threshold then frown face NFT, and if above X threshold then we get Happy face NFT
        string memory imageURI = i_lowImageURI;
        if (price >= s_tokenIdToHighValues[tokenId]) {
            imageURI = i_highImageURI;
        }
        return
            string( /**typecasting it as string */
                abi.encodePacked( /**concatenating _baseURI with the base64 bit of code because they combine to return that metadata we have encoded */
                    _baseURI(),
                    Base64.encode( // this will give us the base64 code of this imageURI metadata, but we usually need some tags first, after which we give base64 code then
                        //in browser window search bar we can directly open the details of whats encoded in base64
                        bytes(
                            abi.encodePacked( /* we are going to encode ourselves the JSON ourselves; we are gonna use single quotes because inside of the abi.encodePacked */
                                '{"name":"',
                                name(), // You can add whatever name here, we have name function in ERC721 SC
                                '", "description":"An NFT that changes based on the Chainlink Feed", ',
                                '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                                imageURI,
                                '"}'
                            ) // this way we are encoding this into binary in compressed form
                        )
                    )
                )
            ); // so we need to append this first bit now, and we should be good to go
    }
}
