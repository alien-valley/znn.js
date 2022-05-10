/* This API call will return information about the os. */
const osInfo = (client) => {
    return client.request({method: "stats.osInfo", params:[]});
};

/* This API call will return information about the process. */
const processInfo = (client) => {
    return client.request({method: "stats.processInfo", params:[]});
};

/* This API call will return information about the network. */
const networkInfo = (client) => {
    return client.request({method: "stats.networkInfo", params:[]});
};

module.exports = {
    osInfo,
    processInfo,
    networkInfo
}
