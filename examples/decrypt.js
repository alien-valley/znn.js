const KeyFile = require('../src/keyFile.js')
const KeyPair = require('../src/keyPair.js')

async function main() {
    const password = "password";
    const keyFileJ = {
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

    const entropy = await KeyFile.Decrypt(keyFileJ, password);
    console.log(`entropy is ${entropy.toString('hex')}`);
    const keyPair = KeyPair.FromEntropy(entropy);
    const address = keyPair.address();
    console.log(`decrypted address is ${address.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });