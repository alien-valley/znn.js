const api = require("./api")
const {AccountBlock, HashHeight, Hash} = require("./model")

const Send = async (client, from, to, zts, amount) => {
    let block = new AccountBlock();

    block.blockType = 2; // userSend
    block.address = from.address;
    block.publicKey = from.publicKey;

    const frontier = await api.ledger.getFrontierBlock(client, from.address);
    if (frontier == null) {
        block.height = 1;
    } else {
        block.height = frontier.height + 1;
        block.previousHash = Hash.Parse(frontier.hash);
    }

    const momentum = await api.ledger.getFrontierMomentum(client);
    block.momentumAcknowledged = new HashHeight(momentum.height, Hash.Parse(momentum.hash));
    block.toAddress = to;
    block.tokenStandard = zts;
    block.amount = amount;

    // set plasma, fail in case of not enough
    const required = await api.embedded.plasma.getRequiredPoWForAccountBlock(client, {
        blockType: 2,
        address: from.address,
        toAddress: to,
        data: Buffer.alloc(0),
    });

    if (required.requiredDifficulty !== 0) {
        throw `znn.js is not able to produce plasma using PoW. Please fuse to ${from.address.toString()}`;
    }
    block.fusedPlasma = required.basePlasma;

    block.hash = block.getHash();
    block.signature = await from.sign(block.hash);

    return api.ledger.publishRawTransaction(client, block)
}

module.exports = {
    Send,
}