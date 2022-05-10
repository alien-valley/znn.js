const toMomentums = async (client) => {
    return client.request({method: "ledger.subscribe", params:["momentums"]});
};

// TODO @VONSBAK: port the rest of subscribe API

module.exports = {
    toMomentums,
}
