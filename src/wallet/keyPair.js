const {getPublicKey} = require("ed25519-hd-key");
const {SHA3} = require("sha3");
const {sign} = require('noble-ed25519');

const {Address} = require('../model')

class KeyPair {
    constructor(privateKey) {
        this.privateKey = privateKey;
        this.publicKey = getPublicKey(privateKey, false);
        this.address = new Address(Buffer.concat([Uint8Array.from([0]), SHA3(256).update(this.publicKey).digest().subarray(0, 19)]))
    }

    static FromPrivateKey(privateKey) {
        return new KeyPair(privateKey)
    }

    sign(data) {
        return sign(data.core, this.privateKey.toString('hex')).then(Buffer.from);
    }
}

module.exports = {
    KeyPair
};
