wrap = async (answer) => (await answer).result

// param is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L67
// respose is https://github.com/zenon-network/znn_sdk_dart/blob/master/lib/src/model/embedded/plasma.dart#L103
const getRequiredPoWForAccountBlock = (client, param) => {
    return wrap(client('embedded.plasma.getRequiredPoWForAccountBlock', [{
        blockType: param.blockType,
        address: param.address.toString(),
        toAddress: param.toAddress.toString(),
        data: param.data.toString('base64'),
    }]));
}

module.exports = {
    getRequiredPoWForAccountBlock,
}