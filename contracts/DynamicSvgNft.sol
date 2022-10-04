// DynamicSvgNft/sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

//imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DynamicSvgNft is ERC721 {
    // we are not gonna call "setTokenURI" function that we called the last time, we can just use the raw ERC721
    //instead of an extension
    // mint the NFTs
    // store our SVG infromation somewhere
    // some logic to say "Show X image or Y image depending upon somethings

    uint256 private s_tokenCounter;
    string private s_lowImageURI;
    string private s_highImageURI;

    constructor(string memory lowSvg, string memory highSvg) ERC721("Dynamic SVG NFT", "DSN") {
        s_tokenCounter = 0;
    }

    function mintNft() public {
        // s_tokenIdToHighValues[s_tokenCounter] = highValue;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }
}
