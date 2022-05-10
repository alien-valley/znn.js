const publishRawTransaction = (client, accountBlock) => {
    console.log(`publishing block hash=${accountBlock.hash.toString()} height=${accountBlock.height} address=${accountBlock.address.toString()}`);
    return client.request({method: 'ledger.publishRawTransaction', params: [accountBlock.toJson()]});
}

/* This API call will return the last account block of the specified address */
const getFrontierAccountBlock = (client, address) => {
    return client.request({method: "ledger.getFrontierAccountBlock", params: [address.toString()]});
};

/* This API call will return a list of all account blocks sent to this address that have not been included into a momentum so far */
const getUnconfirmedBlocksByAddress = (client, address, pageIndex, pageSize) => {
    return client.request({method: "ledger.getUnconfirmedBlocksByAddress", params: [address.toString(), pageIndex, pageSize]});
};

/* This API call will return a list of all account blocks sent to this address that currently don't have a corresponding receive-account-block */
const getUnreceivedBlocksByAddress = (client, address, pageIndex, pageSize) => {
    return client.request({method: "ledger.getUnreceivedBlocksByAddress", params: [address.toString(), pageIndex, pageSize]});
};

/* This API call will return information about the account block with the specified hash */
const getAccountBlockByHash = (client, hash) => {
    return client.request({method: "ledger.getAccountBlockByHash", params:[hash]});
};

/* This API call will return a list of account blocks for the account-chain with the specified address */
const getAccountBlocksByHeight = (client, address, height, count) => {
    return client.request({method: "ledger.getAccountBlocksByHeight", params:[address.toString(), height, count]});
};

/* This API call will return a list of account blocks for the account-chain with the specified address for a specified range of pages. */
const getAccountBlocksByPage = (client, address, pageIndex, pageSize) => {
    return client.request({method: "ledger.getAccountBlocksByPage", params:[address.toString(), pageIndex, pageSize]});
};

/* This API call will return the latest momentum */
const getFrontierMomentum = (client) => {
    return client.request({method: "ledger.getFrontierMomentum", params:[]});
};

/* This API call will return the momentum for the period before the specified time */
const getMomentumBeforeTime = (client, time) => {
    return client.request({method: "ledger.getMomentumBeforeTime", params:[time]});
};

/* This API call will return momentums by page */
const getMomentumsByPage = (client, pageIndex, pageSize) => {
    return client.request({method: "ledger.getMomentumsByPage", params:[pageIndex, pageSize]});
};

/* This API call will return the momentum with the specified hash */
const getMomentumByHash = (client, hash) => {
    return client.request({method: "ledger.getMomentumByHash", params:[hash]});
};

/* This API call will return a list of momentums from height to height + count */
const getMomentumsByHeight = (client, height, count) => {
    return client.request({method: "ledger.getMomentumsByHeight", params:[height, count]});
};

/*This API call will return a list of momentums from height to height + count with information about the account blocks they contain */
const getDetailedMomentumsByHeight = (client, height, count) => {
    return client.request({method: "ledger.getDetailedMomentumsByHeight", params:[height, count]});
};

/* This API call will return information about the account-chain of the specified address */
const getAccountInfoByAddress = (client, address) => {
    return client.request({method: "ledger.getAccountInfoByAddress", params:[address.toString()]});
};

module.exports = {
    publishRawTransaction,
    getFrontierAccountBlock,
    getUnconfirmedBlocksByAddress,
    getUnreceivedBlocksByAddress,
    getAccountBlockByHash,
    getAccountBlocksByHeight,
    getAccountBlocksByPage,
    getFrontierMomentum,
    getMomentumBeforeTime,
    getMomentumByHash,
    getMomentumsByHeight,
    getMomentumsByPage,
    getDetailedMomentumsByHeight,
    getAccountInfoByAddress
}
