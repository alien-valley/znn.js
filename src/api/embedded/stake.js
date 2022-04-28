wrap = async (answer) => (await answer).result

/* This API call will return staking information for a particular address */
const getEntriesByAddress = (client, address, pageIndex, pageSize) => {
    return wrap(client('embedded.stake.getEntriesByAddress', [address.toString(), pageIndex, pageSize]));
}

/* This API call will return staking information for a particular address */
const getUncollectedReward = (client, address) => {
    return wrap(client('embedded.stake.getUncollectedReward', [address.toString()]));
}

/* This API call will return reward information the specified stake for a specified range of pages. */
const getFrontierRewardByPage = (client, address, pageIndex, pageSize) => {
    return wrap(client('embedded.stake.getFrontierRewardByPage', [address.toString(), pageIndex, pageSize]));
}

module.exports = {
    getEntriesByAddress,
    getUncollectedReward,
    getFrontierRewardByPage
}