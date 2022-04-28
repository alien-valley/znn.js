wrap = async (answer) => (await answer).result

// param is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L67
// respose is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L103
const getInternalRequiredPoWForAccountBlock = (client, param) => {
    return wrap(client('embedded.plasma.getRequiredPoWForAccountBlock', [{
        blockType: param.blockType,
        address: param.address.toString(),
        toAddress: param.toAddress.toString(),
        data: param.data.toString('base64'),
    }]));
}

/* This API call will return plasma information about an address. */
const get = (client, address) => {
    return wrap(client('embedded.plasma.get', [address.toString()]));
}

/* This API call will return plasma information about an address. */
const getEntriesByAddress = (client, address, pageIndex, pageSize) => {
    return wrap(client('embedded.plasma.getEntriesByAddress', [address.toString(), pageIndex, pageSize]));
}

/* This API call will return the required PoW for a given block */
const getRequiredPoWForAccountBlock = (client, address, blockType, toAddress, data) => {
    return wrap(client('embedded.plasma.getRequiredPoWForAccountBlock', [{
        blockType: blockType,
        address: address.toString(),
        toAddress: toAddress,
        data: data,
    }]));
}

module.exports = {
    getInternalRequiredPoWForAccountBlock,
    get,
    getEntriesByAddress,
    getRequiredPoWForAccountBlock
}
