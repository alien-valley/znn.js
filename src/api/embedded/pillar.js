const {unwrapResponse} = require("../utils");
const {AccountBlock, znnZts, emptyZts, PillarAddress, qsrZts} = require("../../model");
const {CommonABI, PillarABI} = require("../../embedded");

/* This API call will return the current QSR cost for registering a new Pillar. */
const getQsrRegistrationCost = (client) => {
    return unwrapResponse(client('embedded.pillar.getQsrRegistrationCost', []));
}

/* This API call will return information about the availability of a name for a Pillar. */
const checkNameAvailability = (client, name) => {
    return unwrapResponse(client('embedded.pillar.checkNameAvailability', [name]));
}

/* This API call will return the list of Pillars in the network with additional information. */
const getAll = (client, pageIndex, pageSize) => {
    return unwrapResponse(client('embedded.pillar.getAll', [pageIndex, pageSize]));
}

/* This API call will return all the Pillars registered by an address. */
const getByOwner = (client, pillarAddress) => {
    return unwrapResponse(client('embedded.pillar.getByOwner', [pillarAddress]));
}

/* This API call will return information about the Pillar with the specified name. */
const getByName = (client, name) => {
    return unwrapResponse(client('embedded.pillar.getByName', [name]));
}

/* This API call will return the total number of delegations for a particular Pillar. */
const getDelegatedPillar = (client, pillarAddress) => {
    return unwrapResponse(client('embedded.pillar.getDelegatedPillar', [pillarAddress]));
}

/* This API call will return the amount of QSR deposited that can be used to create a Pillar. */
const getDepositedQsr = (client, pillarAddress) => {
    return unwrapResponse(client('embedded.pillar.getDepositedQsr', [pillarAddress]));
}

/* This API call will return the uncollected reward for the specified pillar. */
const getUncollectedReward = (client, pillarAddress) => {
    return unwrapResponse(client('embedded.pillar.getUncollectedReward', [pillarAddress]));
}

/* This API call will return the uncollected reward for the specified pillar. */
const getFrontierRewardByPage = (client, pillarAddress, pageIndex, pageSize) => {
    return unwrapResponse(client('embedded.pillar.getFrontierRewardByPage', [pillarAddress, pageIndex, pageSize]));
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
