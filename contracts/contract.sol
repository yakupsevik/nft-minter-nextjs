// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMinter is ERC721, ERC721Enumerable, ERC721URIStorage {

    using SafeMath for uint256;

    uint public constant mintPrice = 5 ether;

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        return super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        return super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor() ERC721("NFTMiner", "NFT") {}

    function mint(string memory _uri) public payable {
        require(msg.value >= mintPrice, "Not enough BNB sent; check price!"); 

        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, _uri);
    }

}