const bip39 = require('bip39');
const {getPublicKey, derivePath} = require('ed25519-hd-key');

// target is to obtain the baseAddress from the keyFile from the mnemonic
async function main() {
    const mnemonic = "abstract affair idle position alien fluid board ordinary exist afraid chapter wood wood guide sun walnut crew perfect place firm poverty model side million";
    const password = "password";
    const name = "test-keyFile"; // probably not useful since we don't read from FS; here for consistency
    const keyFile = {
        "baseAddress": "z1qq9n7fpaqd8lpcljandzmx4xtku9w4ftwyg0mq",
        "crypto": {
            "argon2Params": {
                "salt": "0xab4801d422d25662820f75b53878bf08"
            },
            "cipherData": "0x652514c94526bbca6d82f5c663d047803b18819ef7be0dd6bc45822343b70a46d7ffda6730ccd8a26f636bacfcb318d3",
            "cipherName": "aes-256-gcm",
            "kdf": "argon2.IDKey",
            "nonce": "0xf52d55466f05414a5a9f528b"
        },
        "timestamp": 1639039880,
        "version": 1
    };

    // const entropy = bip39.mnemonicToEntropy(mnemonic);
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    const {key: prv} = derivePath(`m/44'/73404'/0'`, seed);
    const pub = getPublicKey(prv, false);

    // should get 881967d6529347a07f73ee2c5f0596b1b4bce44b828ac0a1fd77a0c3f1903559
    console.log(pub);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });