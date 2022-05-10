const {AccountBlock, znnZts, emptyZts, StakeAddress} = require("../../model");
const {CommonABI, StakeABI} = require("../../embedded");

/* This API call will return staking information for a particular address */
const getEntriesByAddress = (client, address, pageIndex, pageSize) => {
    return client.request({method: 'embedded.stake.getEntriesByAddress', params:[address.toString(), pageIndex, pageSize]});
}

/* This API call will return staking information for a particular address */
const getUncollectedReward = (client, address) => {
    return client.request({method: 'embedded.stake.getUncollectedReward', params:[address.toString()]});
}

/* This API call will return reward information the specified stake for a specified range of pages. */
const getFrontierRewardByPage = (client, address, pageIndex, pageSize) => {
    return client.request({method: 'embedded.stake.getFrontierRewardByPage', params:[address.toString(), pageIndex, pageSize]});
}

const stake = ({durationInSec, amount}) => {
    return AccountBlock.ContractCall(
        StakeAddress, znnZts, amount,
        StakeABI.encode('Stake', [durationInSec]))
}

const cancel = ({id}) => {
    return AccountBlock.ContractCall(
        StakeAddress, emptyZts, 0,
        StakeABI.encode('Cancel', [id]))
}

const collectRewards = ({}) => {
    return AccountBlock.ContractCall(
        StakeAddress, emptyZts, 0,
        CommonABI.encode('CollectReward', []))
}

module.exports = {
    getEntriesByAddress,
    getUncollectedReward,
    getFrontierRewardByPage,
    stake,
    cancel,
    collectRewards
}
