const {unwrapResponse} = require("../utils");

/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssetsByKeyIdHash = (client, keyId) => {
    return unwrapResponse(client('embedded.swap.getAssetsByKeyIdHash', [keyId]));
}

/* This API call will return the amount of ZNN and QSR that have not been swapped yet */
const getAssets = (client) => {
    return unwrapResponse(client('embedded.swap.getAssets', []));
}

/* This API call will return the number of legacy Pillars not swapped yet */
const getLegacyPillars = (client) => {
    return unwrapResponse(client('embedded.swap.getLegacyPillars', []));
}

module.exports = {
    getAssetsByKeyIdHash,
    getAssets,
    getLegacyPillars
}
