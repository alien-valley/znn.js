const {AccountBlock, AcceleratorAddress, emptyZts, znnZts} = require("../../model");
const {AcceleratorABI} = require("../../embedded");
const {provider} = require("../../provider");

/* Get all. */
const getAll = (pageIndex, pageSize) => {
    return provider.client.request({method: 'embedded.accelerator.getAll', params:[pageIndex, pageSize]});
}

/* Get a single project by a given ID. */
const getProjectById = (projectID) => {
    return provider.client.request({method: 'embedded.accelerator.getProjectById', params:[projectID]});
}

/* Get a single project by a given ID. */
const getPhaseById = (phaseID) => {
    return provider.client.request({method: 'embedded.accelerator.getPhaseById', params:[phaseID]});
}

/* Get a single project by a given ID. */
const getPillarVotes = (name, hashes) => {
    return provider.client.request({method: 'embedded.accelerator.getPillarVotes', params:[name, hashes]});
}

/* Get a single project by a given ID. */
const getVoteBreakdown = (hash) => {
    return provider.client.request({method: 'embedded.accelerator.getVoteBreakdown', params:[hash]});
}

const createProject = ({name, description, url, znnFundsNeeded, qsrFundsNeeded}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, znnZts, 1e8,
        AcceleratorABI.encode('CreateProject', [name, description, url, znnFundsNeeded, qsrFundsNeeded]))
}

const addPhase = ({id, name, description, url, znnFundsNeeded, qsrFundsNeeded}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, emptyZts, 0,
        AcceleratorABI.encode('AddPhase', [id, name, description, url, znnFundsNeeded, qsrFundsNeeded]))
}

const updatePhase = ({id, name, description, url, znnFundsNeeded, qsrFundsNeeded}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, emptyZts, 0,
        AcceleratorABI.encode('UpdatePhase', [id, name, description, url, znnFundsNeeded, qsrFundsNeeded]))
}

const donate = ({amount, zts}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, zts, amount,
        AcceleratorABI.encode('Donate', []))
}

const voteByName = ({id, pillarName, vote}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, emptyZts, 0,
        AcceleratorABI.encode('VoteByName', [id, pillarName, vote]))
}

const voteByProdAddress = ({id, vote}) => {
    return AccountBlock.ContractCall(
        AcceleratorAddress, emptyZts, 0,
        AcceleratorABI.encode('VoteByProdAddress', [id, vote]))
}

module.exports = {
    getAll,
    getProjectById,
    getPhaseById,
    getPillarVotes,
    getVoteBreakdown,
    createProject,
    addPhase,
    updatePhase,
    donate,
    voteByName,
    voteByProdAddress
}
