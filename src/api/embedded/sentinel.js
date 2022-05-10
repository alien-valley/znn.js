const {AccountBlock, znnZts, SentinelAddress, emptyZts, qsrZts} = require("../../model");
const {SentinelABI, CommonABI} = require("../../embedded");

/* This API call will return all the Sentinels registered by an address. */
const getByOwner = (client, ownerAddress) => {
    return client.request({method: 'embedded.sentinel.getByOwner', params:[ownerAddress]});
}

/* This API call will return a list of all registered Sentinels. */
const getAllActive = (client, pageIndex, pageSize) => {
    return client.request({method: 'embedded.sentinel.getAllActive', params:[pageIndex, pageSize]});
}

/* This API call will return the amount of QSR the address has deposited in order to create a Sentinel. */
const getDepositedQsr = (client, ownerAddress) => {
    return client.request({method: 'embedded.sentinel.getDepositedQsr', params:[ownerAddress]});
}

/* This API call will return the uncollected reward for the specified sentinel. */
const getUncollectedReward = (client, ownerAddress) => {
    return client.request({method: 'embedded.sentinel.getUncollectedReward', params:[ownerAddress]});
}

/* This API call will return the uncollected reward for the specified sentinel. */
const getFrontierRewardByPage = (client, ownerAddress, pageIndex, pageSize) => {
    return client.request({method: 'embedded.sentinel.getFrontierRewardByPage', params:[ownerAddress, pageIndex, pageSize]});
}

const register = ({}) => {
    return AccountBlock.ContractCall(
        SentinelAddress, znnZts, 5000e8,
        SentinelABI.encode('Register', []))
}

const revoke = ({}) => {
    return AccountBlock.ContractCall(
        SentinelAddress, emptyZts, 0,
        SentinelABI.encode('Revoke', []))
}

const collectRewards = ({}) => {
    return AccountBlock.ContractCall(
        SentinelAddress, emptyZts, 0,
        CommonABI.encode('CollectReward', []))
}

const depositQsr = ({amount}) => {
    return AccountBlock.ContractCall(
        SentinelAddress, qsrZts, amount,
        CommonABI.encode('DepositQsr', []))
}

const withdrawQsr = ({}) => {
    return AccountBlock.ContractCall(
        SentinelAddress, emptyZts, 0,
        CommonABI.encode('WithdrawQsr', []))
}

module.exports = {
    getByOwner,
    getAllActive,
    getDepositedQsr,
    getUncollectedReward,
    getFrontierRewardByPage,
    register,
    revoke,
    collectRewards,
    depositQsr,
    withdrawQsr
}
