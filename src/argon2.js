const argon2 = require('argon2-browser');

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

    // adding some prints in the DART SDK yields
    // key = e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
    // which in base64 is 6FoYVG5KRaCasTEhcbAm/S7dLXlXyuI2AmT3QlzvcdI=

    // from Go codebase
    // https://github.com/zenon-network/go-zenon/blob/master/wallet/password.go
    // func IDKey(password, salt []byte, time, memory uint32, threads uint8, keyLen uint32) []byte
    // pw := argon2.IDKey([]byte(password), h.salt, 1, 64*1024, 4, 32)
    let key = await argon2.hash({
        pass: password,
        salt: Buffer.from(keyFile.crypto.argon2Params.salt.substr(2), 'hex'),
        time: 1, // the number of iterations
        mem: 64 * 1024, // used memory, in KiB
        parallelism: 4, // desired parallelism (it won't be computed in parallel, however)
        hashLen: 32, // desired hash length
        type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
    })

    // should get e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
    console.log(key.hashHex)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });