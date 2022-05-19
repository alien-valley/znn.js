const {AccountBlock, znnZts, emptyZts, PillarAddress, qsrZts} = require("../../model");
const {CommonABI, PillarABI} = require("../../embedded");
const {provider} = require("../../provider");

/* This API call will return the current QSR cost for registering a new Pillar. */
const getQsrRegistrationCost = () => {
    return provider.client.request({method: 'embedded.pillar.getQsrRegistrationCost', params: []});
}

/* This API call will return information about the availability of a name for a Pillar. */
const checkNameAvailability = (name) => {
    return provider.client.request({method: 'embedded.pillar.checkNameAvailability', params: [name]});
}

/* This API call will return the list of Pillars in the network with additional information. */
const getAll = (pageIndex, pageSize) => {
    return provider.client.request({method: 'embedded.pillar.getAll', params: [pageIndex, pageSize]});
}

/* This API call will return all the Pillars registered by an address. */
const getByOwner = (pillarAddress) => {
    return provider.client.request({method: 'embedded.pillar.getByOwner', params: [pillarAddress]});
}

/* This API call will return information about the Pillar with the specified name. */
const getByName = (name) => {
    return provider.client.request({method: 'embedded.pillar.getByName', params: [name]});
}

/* This API call will return the total number of delegations for a particular Pillar. */
const getDelegatedPillar = (pillarAddress) => {
    return provider.client.request({method: 'embedded.pillar.getDelegatedPillar', params: [pillarAddress]});
}

/* This API call will return the amount of QSR deposited that can be used to create a Pillar. */
const getDepositedQsr = (pillarAddress) => {
    return provider.client.request({method: 'embedded.pillar.getDepositedQsr', params: [pillarAddress]});
}

/* This API call will return the uncollected reward for the specified pillar. */
const getUncollectedReward = (pillarAddress) => {
    return provider.client.request({method: 'embedded.pillar.getUncollectedReward', params: [pillarAddress]});
}

/* This API call will return the uncollected reward for the specified pillar. */
const getFrontierRewardByPage = (pillarAddress, pageIndex, pageSize) => {
    return provider.client.request({
        method: 'embedded.pillar.getFrontierRewardByPage',
        params: [pillarAddress, pageIndex, pageSize]
    });
}

const register = ({
                      name,
                      producerAddress,
                      rewardAddress,
                      giveBlockRewardPercentage,
                      giveDelegateRewardPercentage
                  }) => {
    return AccountBlock.ContractCall(
        PillarAddress, znnZts, 15000e8,
        PillarABI.encode('Register', [name, producerAddress, rewardAddress, giveBlockRewardPercentage, giveDelegateRewardPercentage]))
}

const updatePillar = ({
                          name,
                          producerAddress,
                          rewardAddress,
                          giveBlockRewardPercentage,
                          giveDelegateRewardPercentage
                      }) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        PillarABI.encode('UpdatePillar', [name, producerAddress, rewardAddress, giveBlockRewardPercentage, giveDelegateRewardPercentage]))
}

const revoke = ({name}) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        PillarABI.encode('Revoke', [name]))
}

const delegate = ({name}) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        PillarABI.encode('Delegate', [name]))
}

const undelegate = ({}) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        PillarABI.encode('Undelegate', []))
}

const collectRewards = ({}) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        CommonABI.encode('CollectReward', []))
}

const depositQsr = ({amount}) => {
    return AccountBlock.ContractCall(
        PillarAddress, qsrZts, amount,
        CommonABI.encode('DepositQsr', []))
}

const withdrawQsr = ({}) => {
    return AccountBlock.ContractCall(
        PillarAddress, emptyZts, 0,
        CommonABI.encode('WithdrawQsr', []))
}

module.exports = {
    getQsrRegistrationCost,
    checkNameAvailability,
    getAll,
    getByOwner,
    getByName,
    getDelegatedPillar,
    getDepositedQsr,
    getUncollectedReward,
    getFrontierRewardByPage,
    register,
    updatePillar,
    revoke,
    delegate,
    undelegate,
    collectRewards,
    depositQsr,
    withdrawQsr
}
