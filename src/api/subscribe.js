
const {provider} = require("../provider");

const subscribeTo = async (params) => {
    if (!client.isWS) {
        throw "client must be a WebSocket connection"
    }
    const response = client.request({method: "ledger.subscribe", params});
    return provider.client.subscriptions.newUpdateStream(await response)
}

const toMomentums = async () => {
    return subscribeTo(['momentums'])
};
const toAllAccountBlocks = async () => {
    return subscribeTo(['allAccountBlocks'])
};
const toAccountBlocksByAddress = async (address) => {
    return subscribeTo(['accountBlocksByAddress', address.toString()])
};
const toUnreceivedAccountBlocksByAddress = async (address) => {
    return subscribeTo(['unreceivedAccountBlocksByAddress', address.toString()])
};

module.exports = {
    toMomentums,
    toAllAccountBlocks,
    toAccountBlocksByAddress,
    toUnreceivedAccountBlocksByAddress
}
