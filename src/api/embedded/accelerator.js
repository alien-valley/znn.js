wrap = async (answer) => (await answer).result

/* Get all. */
const getAll = (client, pageIndex, pageSize) => {
    return wrap(client('embedded.accelerator.getAll', [pageIndex, pageSize]));
}

/* Get a single project by a given ID. */
const getProjectById = (client, projectID) => {
    return wrap(client('embedded.accelerator.getProjectById', [projectID]));
}

/* Get a single project by a given ID. */
const getPhaseById = (client, phaseID) => {
    return wrap(client('embedded.accelerator.getPhaseById', [phaseID]));
}

/* Get a single project by a given ID. */
const getPillarVotes = (client, name, hashes) => {
    return wrap(client('embedded.accelerator.getPillarVotes', [name, hashes]));
}

/* Get a single project by a given ID. */
const getVoteBreakdown = (client, hash) => {
    return wrap(client('embedded.accelerator.getVoteBreakdown', [hash]));
}

module.exports = {
    getAll,
    getProjectById,
    getPhaseById,
    getPillarVotes,
    getVoteBreakdown
}