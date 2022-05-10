/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssetsByKeyIdHash = (client, keyId) => {
    return client.request({method: 'embedded.swap.getAssetsByKeyIdHash', params:[keyId]});
}

/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssets = (client) => {
    return client.request({method: 'embedded.swap.getAssets', params:[]});
}

/* This API call will return the number of legacy Pillars not swapped yet */
const getLegacyPillars = (client) => {
    return client.request({method: 'embedded.swap.getLegacyPillars', params:[]});
}

module.exports = {
    getAssetsByKeyIdHash,
    getAssets,
    getLegacyPillars
}
