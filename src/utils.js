const api = require("./api")
const {AccountBlock, HashHeight, Hash} = require("./model")

const fastForwardBlock = async (client, keyPair, block) => {
    block.address = keyPair.address;
    block.publicKey = keyPair.publicKey;

    const frontier = await api.ledger.getFrontierBlock(client, keyPair.address);
    if (frontier == null) {
        block.height = 1;
    } else {
        block.height = frontier.height + 1;
        block.previousHash = Hash.Parse(frontier.hash);
    }

    const momentum = await api.ledger.getFrontierMomentum(client);
    block.momentumAcknowledged = new HashHeight(momentum.height, Hash.Parse(momentum.hash));

    // set plasma, fail in case of not enough
    const required = await api.embedded.plasma.getRequiredPoWForAccountBlock(client, block);

    if (required.requiredDifficulty !== 0) {
        throw `znn.js is not able to produce plasma using PoW. Please fuse to ${keyPair.address.toString()}`;
    }
    block.fusedPlasma = required.basePlasma;

    block.hash = block.getHash();
    block.signature = await keyPair.sign(block.hash);

    return api.ledger.publishRawTransaction(client, block)
}

const Send = async (client, keyPair, to, zts, amount) => {
    let block = new AccountBlock();

    block.blockType = 2; // userSend
    block.toAddress = to;
    block.tokenStandard = zts;
    block.amount = amount;

    return fastForwardBlock(client, keyPair, block);
}

const Receive = async (client, keyPair, fromBlockHash) => {
    let block = new AccountBlock();

    block.blockType = 3; // userReceive
    block.fromBlockHash = fromBlockHash;

    return fastForwardBlock(client, keyPair, block);
}

module.exports = {
    Send,
    Receive,
}