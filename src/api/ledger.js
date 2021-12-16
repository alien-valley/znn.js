wrap = async (answer) => (await answer).result

const publishRawTransaction = (client, accountBlock) => {
    console.log(`publishing block hash=${accountBlock.hash.toString()} height=${accountBlock.height} address=${accountBlock.address.toString()}`);
    return wrap(client('ledger.publishRawTransaction', [accountBlock.toJson()]));
}

const getFrontierBlock = (client, address) => {
    return wrap(client("ledger.getFrontierAccountBlock", [address.toString()]));
};

const getAccountInfoByAddress = (client, address) => {
    return wrap(client("ledger.getAccountInfoByAddress", [address.toString()]));
};

const getFrontierMomentum = (client) => {
    return wrap(client("ledger.getFrontierMomentum", []));
};

module.exports = {
    publishRawTransaction,
    getAccountInfoByAddress,
    getFrontierBlock,
    getFrontierMomentum,
}