const bip39 = require("bip39");
const {derivePath} = require("ed25519-hd-key");
const {KeyPair} = require("./keyPair");
const crypto = require("crypto");

class KeyStore {
    constructor(mnemonic) {
        this.mnemonic = mnemonic;
        this.entropy = bip39.mnemonicToEntropy(mnemonic);
        this.seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
        this.baseAddress = this.getKeyPair().address
    }

    static FromMnemonic(mnemonic) {
        return new KeyStore(mnemonic)
    }

    static FromEntropy(entropy) {
        return new KeyStore(bip39.entropyToMnemonic(entropy))
    }

    static Random() {
        return KeyStore.FromEntropy(new Buffer.from(crypto.randomBytes(32), 'utf8'))
    }

    getKeyPair(index = 0) {
        const {key} = derivePath(`m/44'/73404'/${index}'`, this.seed);
        return KeyPair.FromPrivateKey(key);
    }
}

module.exports = {
    KeyStore
};
