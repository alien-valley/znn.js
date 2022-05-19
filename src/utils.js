const api = require("./api")
const {AccountBlock, HashHeight, Hash} = require("./model")
const {provider} = require("./provider");

const fastForwardBlock = async (block) => {
    block.address = provider.keyPair.address;
    block.publicKey = provider.keyPair.publicKey;

    const frontier = await api.ledger.getFrontierAccountBlock(provider.keyPair.address);
    if (frontier == null) {
        block.height = 1;
    } else {
        block.height = frontier.height + 1;
        block.previousHash = Hash.Parse(frontier.hash);
    }

    const momentum = await api.ledger.getFrontierMomentum();
    block.momentumAcknowledged = new HashHeight(momentum.height, Hash.Parse(momentum.hash));

    // set plasma, fail in case of not enough
    const required = await api.embedded.plasma.getInternalRequiredPoWForAccountBlock(block);

    if (required.requiredDifficulty !== 0) {
        throw `znn.js is not able to produce plasma using PoW. Please fuse to ${provider.keyPair.address.toString()}`;
    }
    block.fusedPlasma = required.basePlasma;

    block.hash = block.getHash();
    block.signature = await provider.keyPair.sign(block.hash);

    return api.ledger.publishRawTransaction(block)
}

const Send = async (to, zts, amount) => {
    let block = new AccountBlock();

    block.blockType = 2; // userSend
    block.toAddress = to;
    block.tokenStandard = zts;
    block.amount = amount;

    return fastForwardBlock(block);
}

const Receive = async (fromBlockHash) => {
    let block = new AccountBlock();

    block.blockType = 3; // userReceive
    block.fromBlockHash = fromBlockHash;

    return fastForwardBlock(block);
}

module.exports = {
    Send,
    Receive,
    fastForwardBlock,
}
