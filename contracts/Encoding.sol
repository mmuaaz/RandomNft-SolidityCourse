// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Encoding {
    function combineStrings() public pure returns (string memory) {
        return string(abi.encodePacked("Hi Mom! ", "Miss you."));
    }

    //encoding "Hi Mom!, Miss you." into its bytes form
    //abi.encodePacked  returns a bytes object and we are typecasting it by wrapping it into a string thing to be a string
    //Typecasting, or type conversion, is a method of changing an entity from one data type to another. It is used in computer
    //programming to ensure variables are correctly processed by a function.
    // abi.encodePacked is globally available methods and units
    //https://docs.soliditylang.org/en/latest/cheatsheet.html#global-variables

    //in solditity 0.8.12 + we can use string.concat(stringA, stringB) instead of abi.encodePacked syntax
    //abi.encodePacked is the 3rd on the list of global variable because its a non-standard way to encode stuff
    //to this binary stuff that we just talked about
    // so we learnt in the lesson that encoding a string can take up a lot of binary space, so abi.encodePacked is used which is a
    //non-standard way to encode stuff
    // In this function, we encode the number one to what it'll look like in binary
    // Or put another way, we ABI encode it.
    function encodeNumber() public pure returns (bytes memory) {
        bytes memory number = abi.encode(1);
        return number;
    }

    // You'd use this to make calls to contracts
    function encodeString() public pure returns (bytes memory) {
        bytes memory someString = abi.encode("My name is Muhammad Muaaz");
        return someString;
    }

    // if we want to encode some String but we want to save some space and we didn't need the perfect low level binary
    //then we can do it below as:
    // encodePacked

    function encodeStringPacked() public pure returns (bytes memory) {
        bytes memory someString = abi.encodePacked("some string");
        return someString;
    }

    // abi.encode is very similar to what we have already done before which is Typecasting:
    // It's slightly different from below, and they have different gas costs
    function encodeStringBytes() public pure returns (bytes memory) {
        bytes memory someString = bytes("some string");
        return someString;
    }

    // ok so I had tried to write another string in the "" commas to get the same as a result of decode,
    //but the function didnt consider it and showed only 1 string, so to do multiple strings we do the following:
    function multiEncode() public pure returns (bytes memory) {
        bytes memory someString = abi.encode("My name is Muhammad Muaaz", "age is 32");
        return someString;
    }

    // Gas: 24612
    function multiDecode() public pure returns (string memory, string memory) {
        (string memory someString, string memory someOtherString) = abi.decode(
            multiEncode(),
            (string, string)
        );
        return (someString, someOtherString);
    }

    // encodeStringPacked and encodeStringBytes return the same binary while it has some differences mentioned in the link below:
    // https://forum.openzeppelin.com/t/difference-between-abi-encodepacked-string-and-bytes-string/11837

    // abi.encode and abi.encodePacked can also do the following:
    function decodeString() public pure returns (string memory) {
        string memory someString = abi.decode(encodeString(), (string));
        return someString;
    }

    function multiEncodePacked() public pure returns (bytes memory) {
        bytes memory someString = abi.encodePacked("some string", "it's bigger!");
        return someString;
    }

    // This doesn't work!
    function multiDecodePacked() public pure returns (string memory) {
        string memory someString = abi.decode(multiEncodePacked(), (string));
        return someString;
    }

    // This does!
    // Gas: 22313
    function multiStringCastPacked() public pure returns (string memory) {
        string memory someString = string(multiEncodePacked()); // it works because Packed Encoding is kind of similar to just typecasting
        return someString;
    }

    //How do we send tx that call functions with just the Data Field populated?
    //How do we know what we need to populate the data field in these function call txs?
    // Solidity has some more "low-level" keywords, namely "staticcall" and "call". We've used call in the past, but
    // haven't really explained what was going on. There is also "send"... but basically forget about send.

    // call: How we call functions to change the state of the blockchain.
    // staticcall: This is how (at a low level) we do our "view" or "pure" function calls, and potentially don't change the blockchain state.

    // When you call a function, you are secretly calling "call" behind the scenes, with everything compiled down to the binary stuff
    // for you. Flashback to when we withdrew ETH from our raffle:

    function withdraw(address recentWinner) public {
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }

    // Remember this?
    // - In our {} we were able to pass specific fields of a transaction, like value. we updated the value directly of our tx in solidity
    // - In our () we were able to pass data in order to call a specific function - but there was no function we wanted to call!
    // We only sent ETH, so we didn't need to call a function!
    // If we want to call a function, or send any data, we'd do it in these parathesis!

    // Let's look at another contract to explain this more...
}

//wrapping around abi.encodePacked with some string and wrapping around a
//string is going to return a string
