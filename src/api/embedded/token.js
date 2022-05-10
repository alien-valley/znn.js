const {AccountBlock, znnZts, TokenAddress, emptyZts} = require("../../model");
const {TokenABI} = require("../../embedded");

/* This API call will return a list of all ZTS tokens */
const getAll = (client, pageIndex, pageSize) => {
    return client.request({method: 'embedded.token.getAll', params:[pageIndex, pageSize]});
}

/* This API call will return the list of ZTS issued by an address */
const getByOwner = (client, ownerAddress, pageIndex, pageSize) => {
    return client.request({method: 'embedded.token.getByOwner', params:[ownerAddress, pageIndex, pageSize]});
}

/* This API call will return the ZTS with the specified unique identifier */
const getByZts = (client, zts) => {
    return client.request({method: 'embedded.token.getByZts', params:[zts]});
}

const issueToken = ({
                        tokenName,
                        tokenSymbol,
                        tokenDomain,
                        totalSupply,
                        maxSupply,
                        decimals,
                        mintable,
                        burnable,
                        utility
                    }) => {
    return AccountBlock.ContractCall(
        TokenAddress, znnZts, 1e8,
        TokenABI.encode('IssueToken', [
            tokenName,
            tokenSymbol,
            tokenDomain,
            totalSupply,
            maxSupply,
            decimals,
            mintable,
            burnable,
            utility
        ]))
}

const mintToken = ({tokenStandard, amount, receiveAddress}) => {
    return AccountBlock.ContractCall(
        TokenAddress, emptyZts, 0,
        TokenABI.encode('Mint', [
            tokenStandard,
            amount,
            receiveAddress
        ]))
}

const burnToken = ({tokenStandard, amount}) => {
    return AccountBlock.ContractCall(
        TokenAddress, tokenStandard, amount,
        TokenABI.encode('Burn', []))
}

const updateToken = ({tokenStandard, owner, isMintable, isBurnable}) => {
    return AccountBlock.ContractCall(
        TokenAddress, emptyZts, 0,
        TokenABI.encode('UpdateToken', [tokenStandard, owner, isMintable, isBurnable]))
}

module.exports = {
    getAll,
    getByOwner,
    getByZts,
    issueToken,
    mintToken,
    burnToken,
    updateToken
}
