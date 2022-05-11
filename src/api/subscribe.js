const subscribeTo = async (client, params) => {
    if (!client.isWS) {
        throw "client must be a WebSocket connection"
    }
    const response = client.request({method: "ledger.subscribe", params});
    return client.subscriptions.newUpdateStream(await response)
}

const toMomentums = async (client) => {
    return subscribeTo(client, ['momentums'])
};
const toAllAccountBlocks = async (client) => {
    return subscribeTo(client, ['allAccountBlocks'])
};
const toAccountBlocksByAddress = async (client, address) => {
    return subscribeTo(client, ['accountBlocksByAddress', address.toString()])
};
const toUnreceivedAccountBlocksByAddress = async (client, address) => {
    return subscribeTo(client, ['unreceivedAccountBlocksByAddress', address.toString()])
};

module.exports = {
    toMomentums,
    toAllAccountBlocks,
    toAccountBlocksByAddress,
    toUnreceivedAccountBlocksByAddress
}
