const {PlasmaAddress, qsrZts, AccountBlock, emptyZts} = require("../../model");
const {PlasmaABI} = require("../../embedded");
const {provider} = require("../../provider");

// param is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L67
// response is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L103
const getInternalRequiredPoWForAccountBlock = async (param) => {
    return provider.client.request({method: 'embedded.plasma.getRequiredPoWForAccountBlock', params:[{
        blockType: param.blockType,
        address: param.address.toString(),
        toAddress: param.toAddress.toString(),
        data: param.data.toString('base64'),
    }]});
}

/* This API call will return plasma information about an address. */
const get = (address) => {
    return provider.client.request({method: 'embedded.plasma.get', params:[address.toString()]});
}

/* This API call will return plasma information about an address. */
const getEntriesByAddress = (address, pageIndex, pageSize) => {
    return provider.client.request({method: 'embedded.plasma.getEntriesByAddress', params:[address.toString(), pageIndex, pageSize]});
}

/* This API call will return the required PoW for a given block */
const getRequiredPoWForAccountBlock = (address, blockType, toAddress, data) => {
    return provider.client.request({method: 'embedded.plasma.getRequiredPoWForAccountBlock', params:[{
        blockType: blockType,
        address: address.toString(),
        toAddress: toAddress,
        data: data,
    }]});
}

const fuse = ({beneficiary, amount}) => {
    return AccountBlock.ContractCall(PlasmaAddress, qsrZts, amount, PlasmaABI.encode('Fuse', [beneficiary]))
}

const cancel = ({id}) => {
    return AccountBlock.ContractCall(PlasmaAddress, emptyZts, 0, PlasmaABI.encode('CancelFuse', [id]))
}

module.exports = {
    getInternalRequiredPoWForAccountBlock,
    get,
    getEntriesByAddress,
    getRequiredPoWForAccountBlock,
    fuse,
    cancel,
}
