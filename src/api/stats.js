const {provider} = require("../provider");

/* This API call will return information about the os. */
const osInfo = () => {
    return provider.client.request({method: "stats.osInfo", params:[]});
};

/* This API call will return information about the process. */
const processInfo = () => {
    return provider.client.request({method: "stats.processInfo", params:[]});
};

/* This API call will return information about the network. */
const networkInfo = () => {
    return provider.client.request({method: "stats.networkInfo", params:[]});
};

module.exports = {
    osInfo,
    processInfo,
    networkInfo
}
