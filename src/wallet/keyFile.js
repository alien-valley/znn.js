const argon2 = require('argon2-browser');
const crypto = require('crypto-browserify');
const {KeyPair} = require('./keyPair')

// https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81
// Demo implementation of using `aes-256-gcm` with node.js's `crypto` lib.
const aes256gcm = (key) => {
    const ALGO = 'aes-256-gcm';

    // encrypt returns base64-encoded ciphertext
    const encrypt = (str) => {
        // The `iv` for a given key must be globally unique to prevent
        // against forgery attacks. `randomBytes` is convenient for
        // demonstration but a poor way to achieve this in practice.
        //
        // See: e.g. https://csrc.nist.gov/publications/detail/sp/800-38d/final
        const nonce = new Buffer.from(crypto.randomBytes(12), 'utf8');
        const cipher = crypto.createCipheriv(ALGO, key, nonce);
        cipher.setAAD(new Buffer.from("zenon", 'utf8'))

        // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        let enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        enc += cipher.getAuthTag().toString('hex')
        return [enc, nonce];
    };

    // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = (enc, iv, authTag) => {
        const decipher = crypto.createDecipheriv(ALGO, key, iv);
        decipher.setAAD(new Buffer.from("zenon", 'utf8'))
        decipher.setAuthTag(authTag);

        let str = decipher.update(enc, undefined, 'hex');
        str += decipher.final('hex');
        return new Buffer.from(str, 'hex');
    };

    return {
        encrypt,
        decrypt,
    };
};

class KeyFile {
    // returns entropy
    static async Decrypt(j, password) {
        // adding some prints in the DART SDK yields
        // key = e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
        // which in base64 is 6FoYVG5KRaCasTEhcbAm/S7dLXlXyuI2AmT3QlzvcdI=

        let givenBaseAddress = j.baseAddress;
        let salt = j.crypto.argon2Params.salt.substr(2);
        let encrypted = j.crypto.cipherData.substr(2);
        let aesNonce = j.crypto.nonce.substr(2)

        // from Go codebase
        // https://github.com/zenon-network/go-zenon/blob/master/wallet/password.go#L25
        /*
            pw := argon2.IDKey([]byte(password), h.salt, 1, 64*1024, 4, 32)
            func IDKey(password, salt []byte, time, memory uint32, threads uint8, keyLen uint32) []byte
         */
        let key = await argon2.hash({
            pass: password,
            salt: Buffer.from(salt, 'hex'),
            time: 1, // the number of iterations
            mem: 64 * 1024, // used memory, in KiB
            parallelism: 4, // desired parallelism (it won't be computed in parallel, however)
            hashLen: 32, // desired hash length
            type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
        })

        // should get e85a18546e4a45a09ab1312171b026fd2edd2d7957cae2360264f7425cef71d2
        // console.log(key)

        // from Go codebase
        // https://github.com/zenon-network/go-zenon/blob/master/wallet/keyfile.go#L83
        /*
            entropy, err := aesGCMDecrypt(derivedKey.password[:32], kf.Crypto.CipherData, kf.Crypto.AesNonce)
            if err != nil {
                return nil, ErrWrongPassword
            }
         */

        const aesCipher = aes256gcm(key.hash);
        const entropy = aesCipher.decrypt(
            Buffer.from(encrypted.substr(0, encrypted.length - 32), 'hex'),
            Buffer.from(aesNonce, 'hex'),
            Buffer.from(encrypted.substr(encrypted.length - 32, 32), 'hex'),
        ).subarray(0, 32);

        const kp = KeyPair.FromEntropy(entropy);
        let baseAddress = kp.address;

        if (baseAddress.toString() !== givenBaseAddress) {
            throw "invalid base address in keyFile";
        }

        return entropy;
    }

    // returns encrypted JSON
    static async Encrypt(entropy, password) {
        const kp = KeyPair.FromEntropy(entropy);
        let baseAddress = kp.address;

        // generate new salt, as hex string
        let salt = new Buffer.from(crypto.randomBytes(16), 'utf8')

        let key = await argon2.hash({
            pass: password,
            salt: salt,
            time: 1, // the number of iterations
            mem: 64 * 1024, // used memory, in KiB
            parallelism: 4, // desired parallelism (it won't be computed in parallel, however)
            hashLen: 32, // desired hash length
            type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
        })

        const aesCipher = aes256gcm(key.hash);
        let [encrypted, aesNonce] = aesCipher.encrypt(entropy)

        return {
            baseAddress: baseAddress.toString(),
            crypto: {
                argon2Params: {
                    salt: "0x" + salt.toString('hex'),
                },
                cipherData: "0x" + encrypted.toString('hex'),
                cipherName: "aes-256-gcm",
                kdf: "argon2.IDKey",
                nonce: "0x" + aesNonce.toString('hex'),
            },
            timestamp: Math.floor(Date.now() / 1000),
            version: 1
        }
    }
}

module.exports = {
    KeyFile
};
