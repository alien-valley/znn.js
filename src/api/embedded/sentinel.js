wrap = async (answer) => (await answer).result

/* This API call will return all the Sentinels registered by an address. */
const getByOwner = (client, ownerAddress) => {
    return wrap(client('embedded.sentinel.getByOwner', [ownerAddress]));
}

/* This API call will return a list of all registered Sentinels. */
const getAllActive = (client, pageIndex, pageSize) => {
    return wrap(client('embedded.sentinel.getAllActive', [pageIndex, pageSize]));
}

/* This API call will return the amount of QSR the address has deposited in order to create a Sentinel. */
const getDepositedQsr = (client, ownerAddress) => {
    return wrap(client('embedded.sentinel.getDepositedQsr', [ownerAddress]));
}

/* This API call will return the uncollected reward for the specified sentinel. */
const getUncollectedReward = (client, ownerAddress) => {
    return wrap(client('embedded.sentinel.getUncollectedReward', [ownerAddress]));
}

/* This API call will return the uncollected reward for the specified sentinel. */
const getFrontierRewardByPage = (client, ownerAddress, pageIndex, pageSize) => {
    return wrap(client('embedded.sentinel.getFrontierRewardByPage', [ownerAddress, pageIndex, pageSize]));
}

module.exports = {
    getByOwner,
    getAllActive,
    getDepositedQsr,
    getUncollectedReward,
    getFrontierRewardByPage
}