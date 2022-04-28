wrap = async (answer) => (await answer).result

/* This API call will return information about the os. */
const osInfo = (client) => {
    return wrap(client("stats.osInfo", []));
};

/* This API call will return information about the process. */
const processInfo = (client) => {
    return wrap(client("stats.processInfo", []));
};

/* This API call will return information about the network. */
const networkInfo = (client) => {
    return wrap(client("stats.networkInfo", []));
};

module.exports = {
    osInfo,
    processInfo,
    networkInfo
}