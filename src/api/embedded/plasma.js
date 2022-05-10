const {PlasmaAddress, qsrZts, AccountBlock, emptyZts} = require("../../model");
const {PlasmaABI} = require("../../embedded");

// param is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L67
// response is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L103
const getInternalRequiredPoWForAccountBlock = async (client, param) => {
    return client.request({method: 'embedded.plasma.getRequiredPoWForAccountBlock', params:[{
        blockType: param.blockType,
        address: param.address.toString(),
        toAddress: param.toAddress.toString(),
        data: param.data.toString('base64'),
    }]});
}

/* This API call will return plasma information about an address. */
const get = (client, address) => {
    return client.request({method: 'embedded.plasma.get', params:[address.toString()]});
}

/* This API call will return plasma information about an address. */
const getEntriesByAddress = (client, address, pageIndex, pageSize) => {
    return client.request({method: 'embedded.plasma.getEntriesByAddress', params:[address.toString(), pageIndex, pageSize]});
}

/* This API call will return the required PoW for a given block */
const getRequiredPoWForAccountBlock = (client, address, blockType, toAddress, data) => {
    return client.request({method: 'embedded.plasma.getRequiredPoWForAccountBlock', params:[{
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
