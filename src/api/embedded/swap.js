const {provider} = require("../../provider");

/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssetsByKeyIdHash = (keyId) => {
    return provider.client.request({method: 'embedded.swap.getAssetsByKeyIdHash', params:[keyId]});
}

/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssets = () => {
    return provider.client.request({method: 'embedded.swap.getAssets', params:[]});
}

/* This API call will return the number of legacy Pillars not swapped yet */
const getLegacyPillars = () => {
    return provider.client.request({method: 'embedded.swap.getLegacyPillars', params:[]});
}

module.exports = {
    getAssetsByKeyIdHash,
    getAssets,
    getLegacyPillars
}
