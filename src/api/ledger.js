const {unwrapResponse} = require("./utils");

const publishRawTransaction = (client, accountBlock) => {
    console.log(`publishing block hash=${accountBlock.hash.toString()} height=${accountBlock.height} address=${accountBlock.address.toString()}`);
    return unwrapResponse(client('ledger.publishRawTransaction', [accountBlock.toJson()]));
}

/* This API call will return the last account block of the specified address */
const getFrontierAccountBlock = (client, address) => {
    return unwrapResponse(client("ledger.getFrontierAccountBlock", [address.toString()]));
};

/* This API call will return a list of all account blocks sent to this address that have not been included into a momentum so far */
const getUnconfirmedBlocksByAddress = (client, address, pageIndex, pageSize) => {
    return unwrapResponse(client("ledger.getUnconfirmedBlocksByAddress", [address.toString(), pageIndex, pageSize]));
};

/* This API call will return a list of all account blocks sent to this address that currently don't have a corresponding receive-account-block */
const getUnreceivedBlocksByAddress = (client, address, pageIndex, pageSize) => {
    return unwrapResponse(client("ledger.getUnreceivedBlocksByAddress", [address.toString(), pageIndex, pageSize]));
};

/* This API call will return information about the account block with the specified hash */
const getAccountBlockByHash = (client, hash) => {
    return unwrapResponse(client("ledger.getAccountBlockByHash", [hash]));
};

/* This API call will return a list of account blocks for the account-chain with the specified address */
const getAccountBlocksByHeight = (client, address, height, count) => {
    return unwrapResponse(client("ledger.getAccountBlocksByHeight", [address.toString(), height, count]));
};

/* This API call will return a list of account blocks for the account-chain with the specified address for a specified range of pages. */
const getAccountBlocksByPage = (client, address, pageIndex, pageSize) => {
    return unwrapResponse(client("ledger.getAccountBlocksByPage", [address.toString(), pageIndex, pageSize]));
};

/* This API call will return the latest momentum */
const getFrontierMomentum = (client) => {
    return unwrapResponse(client("ledger.getFrontierMomentum", []));
};

/* This API call will return the momentum for the period before the specified time */
const getMomentumBeforeTime = (client, time) => {
    return unwrapResponse(client("ledger.getMomentumBeforeTime", [time]));
};

/* This API call will return momentums by page */
const getMomentumsByPage = (client, pageIndex, pageSize) => {
    return unwrapResponse(client("ledger.getMomentumsByPage", [pageIndex, pageSize]));
};

/* This API call will return the momentum with the specified hash */
const getMomentumByHash = (client, hash) => {
    return unwrapResponse(client("ledger.getMomentumByHash", [hash]));
};

/* This API call will return a list of momentums from height to height + count */
const getMomentumsByHeight = (client, height, count) => {
    return unwrapResponse(client("ledger.getMomentumsByHeight", [height, count]));
};

/*This API call will return a list of momentums from height to height + count with information about the account blocks they contain */
const getDetailedMomentumsByHeight = (client, height, count) => {
    return unwrapResponse(client("ledger.getDetailedMomentumsByHeight", [height, count]));
};

/* This API call will return information about the account-chain of the specified address */
const getAccountInfoByAddress = (client, address) => {
    return unwrapResponse(client("ledger.getAccountInfoByAddress", [address.toString()]));
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
