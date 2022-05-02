const {unwrapResponse} = require("./utils");

/* This API call will return information about the os. */
const osInfo = (client) => {
    return unwrapResponse(client("stats.osInfo", []));
};

/* This API call will return information about the process. */
const processInfo = (client) => {
    return unwrapResponse(client("stats.processInfo", []));
};

/* This API call will return information about the network. */
const networkInfo = (client) => {
    return unwrapResponse(client("stats.networkInfo", []));
};

module.exports = {
    osInfo,
    processInfo,
    networkInfo
}
