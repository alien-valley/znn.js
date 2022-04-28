wrap = async (answer) => (await answer).result


/* This API call will return the current QSR cost for registering a new Pillar. */
const getQsrRegistrationCost = (client) => {
    return wrap(client('embedded.pillar.getQsrRegistrationCost', []));
}

/* This API call will return information about the availability of a name for a Pillar. */
const checkNameAvailability = (client, name) => {
    return wrap(client('embedded.pillar.checkNameAvailability', [name]));
}

/* This API call will return the list of Pillars in the network with additional information. */
const getAll = (client, pageIndex, pageSize) => {
    return wrap(client('embedded.pillar.getAll', [pageIndex, pageSize]));
}

/* This API call will return all the Pillars registered by an address. */
const getByOwner = (client, pillarAddress) => {
    return wrap(client('embedded.pillar.getByOwner', [pillarAddress]));
}

/* This API call will return information about the Pillar with the specified name. */
const getByName = (client, name) => {
    return wrap(client('embedded.pillar.getByName', [name]));
}

/* This API call will return the total number of delegations for a particular Pillar. */
const getDelegatedPillar = (client, pillarAddress) => {
    return wrap(client('embedded.pillar.getDelegatedPillar', [pillarAddress]));
}

/* This API call will return the amount of QSR deposited that can be used to create a Pillar. */
const getDepositedQsr = (client, pillarAddress) => {
    return wrap(client('embedded.pillar.getDepositedQsr', [pillarAddress]));
}

/* This API call will return the uncollected reward for the specified pillar. */
const getUncollectedReward = (client, pillarAddress) => {
    return wrap(client('embedded.pillar.getUncollectedReward', [pillarAddress]));
}

/* This API call will return the uncollected reward for the specified pillar. */
const getFrontierRewardByPage = (client, pillarAddress, pageIndex, pageSize) => {
    return wrap(client('embedded.pillar.getFrontierRewardByPage', [pillarAddress, pageIndex, pageSize]));
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
    getFrontierRewardByPage
}
